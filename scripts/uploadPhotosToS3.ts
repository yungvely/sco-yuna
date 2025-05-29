// scripts/uploadPhotosToS3.ts
require("dotenv").config();

const {
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");
const {
  CloudFrontClient,
  CreateInvalidationCommand,
} = require("@aws-sdk/client-cloudfront");
const {
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
  existsSync,
} = require("fs");
const { extname, join, relative } = require("path");
const mime = require("mime-types");
const crypto = require("crypto");

const BUCKET_NAME = "sco-yuna-wedding-assets";
const LOCAL_DIR = "./public/photo";
const DISTRIBUTION_ID = "E1UG6CGNN1LQU4";
const TRACKING_FILE = ".s3-uploaded.json";

const uploadedPaths = [];
const deletedPaths = [];

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

const cloudfront = new CloudFrontClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
});

function getAllFiles(dir) {
  return readdirSync(dir).flatMap((file) => {
    const fullPath = join(dir, file);
    return statSync(fullPath).isDirectory()
      ? getAllFiles(fullPath)
      : [fullPath];
  });
}

function hashContent(content) {
  return crypto.createHash("md5").update(content).digest("hex");
}

async function isChanged(key, content) {
  try {
    const head = await s3.send(
      new HeadObjectCommand({ Bucket: BUCKET_NAME, Key: key })
    );
    const remoteHash = head.Metadata?.["hash"];
    const localHash = hashContent(content);
    return remoteHash !== localHash;
  } catch (_) {
    return true; // not found => new file
  }
}

async function upload() {
  // ✅ webp, gif, png만 업로드 대상으로 필터링
  const files = getAllFiles(LOCAL_DIR).filter((f) =>
    /\.(webp|png|gif|svg)$/i.test(f)
  );
  const localRelativePaths = files.map((f) =>
    relative(LOCAL_DIR, f).replace(/\\/g, "/")
  );

  // 이전 업로드 기록 불러오기
  const previousPaths = existsSync(TRACKING_FILE)
    ? JSON.parse(readFileSync(TRACKING_FILE, "utf8"))
    : [];

  // 삭제된 파일 S3에서 제거
  const deleted = previousPaths.filter((p) => !localRelativePaths.includes(p));
  for (const key of deleted) {
    await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key }));
    deletedPaths.push(`/${key}`);
    console.log(`🗑️ Deleted from S3: ${key}`);
  }

  // 변경된 파일만 업로드
  for (const fullPath of files) {
    const relativePath = relative(LOCAL_DIR, fullPath).replace(/\\/g, "/");
    const content = readFileSync(fullPath);
    const mimeType =
      mime.lookup(extname(fullPath)) || "application/octet-stream";

    const changed = await isChanged(relativePath, content);
    if (!changed) continue;

    const hash = hashContent(content);

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: relativePath,
      Body: content,
      ContentType: mimeType,
      CacheControl: "public, max-age=31536000, immutable",
      Metadata: {
        hash,
      },
    });

    await s3.send(command);
    uploadedPaths.push(`/${relativePath}`);
    console.log(`✅ Uploaded (changed): ${relativePath}`);
  }

  // CloudFront 무효화
  const invalidationPaths = [...uploadedPaths, ...deletedPaths];
  if (invalidationPaths.length > 0) {
    console.log("🚀 Creating CloudFront invalidation...");
    await cloudfront.send(
      new CreateInvalidationCommand({
        DistributionId: DISTRIBUTION_ID,
        InvalidationBatch: {
          CallerReference: `${Date.now()}`,
          Paths: {
            Quantity: invalidationPaths.length,
            Items: invalidationPaths,
          },
        },
      })
    );
    console.log("✅ Invalidation complete:", invalidationPaths);
  } else {
    console.log("✅ No changes detected, all files up-to-date.");
  }

  // 업로드 기록 저장
  writeFileSync(TRACKING_FILE, JSON.stringify(localRelativePaths, null, 2));
}

upload().catch(console.error);
