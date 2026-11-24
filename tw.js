// Tailwind 유틸리티를 정적 CSS로 생성 (CDN 대신). 실행: node tw.js
const fs = require("fs"), path = require("path");
let TW; try { TW = path.dirname(require.resolve("tailwindcss/package.json")); } catch { TW = "/opt/npm-tools/node_modules/tailwindcss"; }
const tw = require(TW + "/dist/lib.js");
const base = TW;
(async () => {
  const compiler = await tw.compile('@import "tailwindcss/theme.css" layer(theme);\n@import "tailwindcss/preflight.css" layer(base);\n@import "tailwindcss/utilities.css" layer(utilities);', {
    base, loadStylesheet: async (id) => { const f = path.join(base, id.replace(/^tailwindcss\//, "")); return { path: f, base: path.dirname(f), content: fs.readFileSync(f, "utf8") }; },
  });
  const src = fs.readFileSync(path.join(__dirname, "src/app.jsx"), "utf8") + fs.readFileSync(path.join(__dirname, "src/data.jsx"), "utf8");
  const cands = [...new Set(src.match(/[A-Za-z0-9:\-\[\]\.\/%#_!]+/g))];
  const css = compiler.build(cands);
  fs.writeFileSync(path.join(__dirname, "tw.css"), css);
  console.log("tw.css", (css.length / 1024).toFixed(0) + "KB");
})().catch((e) => { console.error(e); process.exit(1); });
