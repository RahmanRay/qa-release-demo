// Build: esbuild bundle + build identity (version.json, meta build-commit, window.__BUILD__) — one object.
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const nodePaths = (process.env.DEMO_NODE_PATH || "").split(":").filter(Boolean);
const require = createRequire(nodePaths[0] ? nodePaths[0] + "/" : import.meta.url);
const esbuild = require("esbuild");
const git = cmd => execSync(`git ${cmd}`, { encoding: "utf8" }).trim();
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const commit = (process.env.BUILD_COMMIT || git("rev-parse HEAD")).toLowerCase();
if (!/^[0-9a-f]{40}$/.test(commit)) throw new Error("commit must be a full 40-char SHA");
const branch = process.env.BUILD_BRANCH || git("rev-parse --abbrev-ref HEAD");
const dirty = process.env.BUILD_DIRTY ? process.env.BUILD_DIRTY === "true" : git("status --porcelain") !== "";
const identity = { service: "qa-release-demo", version: pkg.version, commit, branch,
  builtAt: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"), buildId: process.env.BUILD_ID || `demo-${pkg.version}`, dirty };
const out = process.env.OUT_DIR || "dist";
const base = (process.env.BASE_PATH || "").replace(/\/$/, "");
mkdirSync(out, { recursive: true });
await esbuild.build({ entryPoints: ["src/main.jsx"], bundle: true, minify: true, outfile: `${out}/app.js`, nodePaths,
  loader: { ".jsx": "jsx" }, jsx: "automatic", define: { __BUILD_INFO__: JSON.stringify(identity), __BASE_PATH__: JSON.stringify(base), "process.env.NODE_ENV": '"production"' } });
writeFileSync(`${out}/version.json`, JSON.stringify(identity, null, 2) + "\n");
const html = readFileSync("index.html", "utf8").replace("<!--BUILD_META-->", `<meta name="build-commit" content="${commit}" />`).replaceAll('"/app.', `"${base}/app.`);
writeFileSync(`${out}/index.html`, html);
// Statik hostinq (GitHub Pages): hər route üçün index.html — dərin link 200 qaytarsın.
for (const route of (process.env.ROUTES || "").split(",").filter(Boolean)) { mkdirSync(`${out}/${route}`, { recursive: true }); writeFileSync(`${out}/${route}/index.html`, html); }
writeFileSync(`${out}/.nojekyll`, "");
console.log("[build-identity]", JSON.stringify(identity));
