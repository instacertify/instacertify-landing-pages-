const path = require("path");
const fs = require("fs");
const multer = require("multer");

const UPLOAD_ROOT = path.join(__dirname, "..", "public", "uploads", "pages");

if (!fs.existsSync(UPLOAD_ROOT)) {
  fs.mkdirSync(UPLOAD_ROOT, { recursive: true });
}

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function pageDir(pageId) {
  const dir = path.join(UPLOAD_ROOT, String(pageId));
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function publicUrl(pageId, filename) {
  return `/uploads/pages/${pageId}/${filename}`;
}

function absoluteFromUrl(url) {
  if (!url || !url.startsWith("/uploads/pages/")) return null;
  const rel = url.replace(/^\//, "");
  return path.join(__dirname, "..", "public", rel);
}

const storage = multer.diskStorage({
  destination(req, _file, cb) {
    try {
      cb(null, pageDir(req.params.id));
    } catch (error) {
      cb(error);
    }
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext)
      ? ext
      : ".jpg";
    const stamp = Date.now();
    const rand = Math.random().toString(36).slice(2, 8);
    cb(null, `${stamp}-${rand}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(_req, file, cb) {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, GIF, or SVG images are allowed"));
    }
    return cb(null, true);
  },
});

function removeFileByUrl(url) {
  const abs = absoluteFromUrl(url);
  if (!abs) return;
  try {
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch (error) {
    console.error("Failed to remove image file:", error.message);
  }
}

function removePageUploadDir(pageId) {
  const dir = path.join(UPLOAD_ROOT, String(pageId));
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  } catch (error) {
    console.error("Failed to remove page upload dir:", error.message);
  }
}

module.exports = {
  upload,
  publicUrl,
  removeFileByUrl,
  removePageUploadDir,
  UPLOAD_ROOT,
};
