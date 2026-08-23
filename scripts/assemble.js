// Combines the two already-built sub-apps (pc/dist, android/dist) plus the
// device-router index.html into a single top-level /dist folder that's
// ready to serve or upload as-is:
//
//   dist/
//     index.html     <- router: detects device, redirects to pc/ or android/
//     pc/             <- desktop build
//     android/        <- mobile build
//
// Run automatically as the last step of `npm run build`.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");

const pcDist = path.join(root, "pc", "dist");
const androidDist = path.join(root, "android", "dist");

for (const [label, dir] of [["pc", pcDist], ["android", androidDist]]) {
  if (!fs.existsSync(dir)) {
    console.error(
      `\n✗ ${label}/dist not found. Did the ${label} workspace build succeed?\n`
    );
    process.exit(1);
  }
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

fs.cpSync(pcDist, path.join(distDir, "pc"), { recursive: true });
fs.cpSync(androidDist, path.join(distDir, "android"), { recursive: true });
fs.copyFileSync(
  path.join(root, "router", "index.html"),
  path.join(distDir, "index.html")
);
fs.copyFileSync(
  path.join(root, "router", "robots.txt"),
  path.join(distDir, "robots.txt")
);
fs.copyFileSync(
  path.join(root, "router", "sitemap.xml"),
  path.join(distDir, "sitemap.xml")
);

console.log("\n✓ Combined build ready in /dist");
console.log("  dist/index.html   (device router)");
console.log("  dist/robots.txt   (root-level, update the domain before deploying)");
console.log("  dist/sitemap.xml  (root-level, update the domain before deploying)");
console.log("  dist/pc/          (desktop build)");
console.log("  dist/android/     (mobile build)\n");
console.log("Run `npm start` to serve it locally.\n");
