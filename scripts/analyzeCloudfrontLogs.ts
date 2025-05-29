import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { parse } from "csv-parse/sync";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { gunzipSync } from "zlib";

const BUCKET_NAME = "sco-yuna-log-bucket";

const creds = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "");
initializeApp({ credential: cert(creds) });
const db = getFirestore();

const s3 = new S3Client({
  region: process.env.S3_REGION || "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});
async function fetchAndAnalyzeLogs() {
  const now = new Date();
  now.setDate(now.getDate() - 1); // 어제자 분석
  const prefix = `${process.env.S3_LOG_PREFIX}${now.getUTCFullYear()}-${String(
    now.getUTCMonth() + 1
  ).padStart(2, "0")}-${String(now.getUTCDate()).padStart(2, "0")}`;

  const list = await s3.send(
    new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET || BUCKET_NAME,
      Prefix: prefix,
    })
  );

  let total = 0;
  let hit = 0;
  let miss = 0;

  for (const obj of list.Contents || []) {
    const res = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET || BUCKET_NAME,
        Key: obj.Key,
      })
    );
    const body = await res?.Body?.transformToByteArray();
    const raw = body && gunzipSync(body).toString("utf8");
    const records = parse(raw, { delimiter: "\t", relax_column_count: true });

    for (const row of records) {
      if (row[0]?.startsWith("#")) continue;
      const resultType = row[7]; // Result Type (Hit/Miss/Error)
      total += 1;
      if (resultType === "Hit") hit += 1;
      else if (resultType === "Miss") miss += 1;
    }
  }

  const hitRate = total > 0 ? (hit / total) * 100 : 0;

  await db
    .collection("cloudfrontLogs")
    .doc(now.toISOString().split("T")[0])
    .set({
      date: now.toISOString().split("T")[0],
      totalRequests: total,
      hit,
      miss,
      hitRate: Math.round(hitRate * 100) / 100,
    });

  console.log(`✅ Saved logs for ${now.toISOString().split("T")[0]}`);
}

fetchAndAnalyzeLogs().catch(console.error);
