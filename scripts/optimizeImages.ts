// scripts/optimizeImages.ts

// @ts-nocheck
// @ts-ignore
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const TARGET_DIR = path.resolve("public/photo");
const MAX_WIDTH = 850;
const QUALITY = 90;
const HASH_STORE = path.resolve(".webp-hash.json");

let previousHashes = {};
if (fs.existsSync(HASH_STORE)) {
  previousHashes = JSON.parse(fs.readFileSync(HASH_STORE, "utf8"));
}

function getAllImageFiles(dir) {
  return fs.readdirSync(dir).flatMap((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) return getAllImageFiles(fullPath);
    return /\.(jpe?g|png|webp)$/i.test(file) ? [fullPath] : [];
  });
}

function hashFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(buffer).digest("hex");
}

const newHashes = {};
console.log("🚀 WebP 변환 시작...");

const originals = getAllImageFiles(TARGET_DIR).filter((f) =>
  /\.(jpe?g|png)$/i.test(f)
);
const webps = getAllImageFiles(TARGET_DIR).filter((f) => /\.webp$/i.test(f));

// 1. 원본 삭제 시 WebP 제거
webps.forEach((webpPath) => {
  const base = webpPath.replace(/\.webp$/, "");
  if (
    !fs.existsSync(base + ".jpg") &&
    !fs.existsSync(base + ".jpeg") &&
    !fs.existsSync(base + ".png")
  ) {
    fs.unlinkSync(webpPath);
    console.log(`🗑️ Removed orphaned WebP: ${webpPath}`);
  }
});

// 2. WebP 재생성 및 해시 관리
originals.forEach((filePath) => {
  const ext = path.extname(filePath);
  const basename = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  const webpPath = path.join(dir, `${basename}.webp`);

  const fileHash = hashFile(filePath);
  newHashes[filePath] = fileHash;

  if (previousHashes[filePath] !== fileHash || !fs.existsSync(webpPath)) {
    execSync(
      `magick "${filePath}" -resize "${MAX_WIDTH}x>" -quality ${QUALITY} "${webpPath}"`
    );
    console.log(`✅ Converted: ${webpPath}`);
  } else {
    console.log(`⏩ Skipped (unchanged): ${webpPath}`);
  }
});

fs.writeFileSync(HASH_STORE, JSON.stringify(newHashes, null, 2));
console.log("✅ 변환 완료 및 해시 저장");
