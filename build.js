// src/*.jsx → app.js (브라우저에서 바로 실행되는 JS). 실행: node build.js
const fs = require("fs");
const path = require("path");
let ts;
try { ts = require("typescript"); } catch { ts = require("/opt/node22/lib/node_modules/typescript"); }
const src = ["data.jsx", "app.jsx"].map((f) => fs.readFileSync(path.join(__dirname, "src", f), "utf8")).join("\n");
const r = ts.transpileModule(`(function(){\n${src}\n})();`, {
  reportDiagnostics: true,
  compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2019, removeComments: false },
});
if (r.diagnostics.length) {
  r.diagnostics.forEach((d) => { const p = d.file.getLineAndCharacterOfPosition(d.start); console.error(`${p.line}: ${ts.flattenDiagnosticMessageText(d.messageText, "\n")}`); });
  process.exit(1);
}
fs.writeFileSync(path.join(__dirname, "app.js"), "/* 빌드 결과물 — src/를 고친 뒤 node build.js */\n" + r.outputText);
console.log("app.js", (r.outputText.length / 1024).toFixed(0) + "KB");
