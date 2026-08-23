// Minimal static file server for the combined /dist build. No extra
// dependencies (uses only Node core modules), so `npm start` works right
// after `npm run build` with nothing else to install.

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

if (!fs.existsSync(ROOT)) {
  console.error(
    "\n✗ dist/ not found. Run `npm run build` first, then `npm start`.\n"
  );
  process.exit(1);
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
  let filePath = path.normalize(path.join(ROOT, urlPath));

  // Guard against path traversal outside of dist/.
  if (!filePath.startsWith(ROOT)) {
    return send(res, 403, "Forbidden");
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    fs.readFile(filePath, (err2, data) => {
      if (err2) {
        return send(res, 404, "404 Not Found");
      }
      const ext = path.extname(filePath).toLowerCase();
      send(res, 200, data, {
        "Content-Type": MIME[ext] || "application/octet-stream",
      });
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n  Alamin Khan portfolio is running:\n`);
  console.log(`  Auto-routed:    http://localhost:${PORT}/`);
  console.log(`  Desktop build:  http://localhost:${PORT}/pc/`);
  console.log(`  Mobile build:   http://localhost:${PORT}/android/\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
