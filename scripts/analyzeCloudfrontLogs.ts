import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { gunzipSync } from "zlib";

dotenv.config();

// ✅ 상수 정의
const BUCKET_NAME = process.env.S3_BUCKET!;
const PREFIX = process.env.S3_LOG_PREFIX!;

const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
if (!raw) throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS_JSON");

let creds: any;
try {
  creds = JSON.parse(raw);
  if (typeof creds.project_id !== "string")
    throw new Error("Invalid project_id");
  if (creds.private_key)
    creds.private_key = creds.private_key.replace(/\\n/g, "\n");
} catch (err) {
  console.error("❌ Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON");
  throw err;
}

initializeApp({ credential: cert(creds) });
const db = getFirestore();

const s3 = new S3Client({
  region: process.env.S3_REGION || "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

async function fetchAndAnalyzeLogs() {
  const now = new Date();
  const dateStr = `${now.getUTCFullYear()}-${String(
    now.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;

  const list = await s3.send(
    new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: PREFIX,
    })
  );

  const keys = (list.Contents || [])
    .map((obj) => obj.Key)
    .filter((key): key is string => !!key && key.includes(dateStr));

  if (keys.length === 0) {
    console.warn("⚠️ No log files found for", dateStr);
    return;
  }

  let total = 0;
  let hit = 0;
  let miss = 0;

  for (const key of keys) {
    const res = await s3.send(
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key })
    );
    const body = await res.Body?.transformToByteArray();
    if (!body) continue;

    const decompressed = gunzipSync(body).toString("utf8");
    const records = parse(decompressed, {
      delimiter: "\t",
      relax_column_count: true,
    });

    let resultTypeIndex = -1;

    for (const row of records) {
      if (typeof row[0] === "string" && row[0].startsWith("#Fields:")) {
        const fields = row.join(" ").replace("#Fields: ", "").split(/\s+/);
        resultTypeIndex = fields.findIndex(
          (f: string) => f === "x-edge-result-type"
        );
        continue;
      }

      if (typeof row[0] !== "string" || row[0].startsWith("#")) continue;
      if (resultTypeIndex === -1) continue;

      const resultType = row[resultTypeIndex];
      total++;
      if (resultType === "Hit") hit++;
      else if (resultType === "Miss") miss++;
    }
  }

  const hitRate = total > 0 ? (hit / total) * 100 : 0;

  await db
    .collection("cloudfrontLogs")
    .doc(dateStr)
    .set({
      date: dateStr,
      totalRequests: total,
      hit,
      miss,
      hitRate: Math.round(hitRate * 100) / 100,
    });

  console.log(`✅ Saved logs for ${dateStr}`);
}

fetchAndAnalyzeLogs().catch((err) => {
  console.error("❌ Failed to analyze CloudFront logs", err);
});
