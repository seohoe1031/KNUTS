const { useState, useEffect, useRef, useMemo } = React;

/* ───────── 샘플 강의 ───────── */
const SAMPLE = {
  id: "sample", sample: true, title: LECTURE.title, course: LECTURE.course, created: 0, duration: LECTURE.duration,
  segs: SEGS.map(({ p, ...s }) => s), outline: OUTLINE, concepts: CONCEPTS, mechs: MECHS, keylines: KEYLINE,
  status: { transcribed: true, corrected: true, summarized: true },
};

const DEFAULT_CFG = {
  openaiKey: "", whisperModel: "whisper-1",
  llm: "anthropic", anthropicKey: "", fastModel: "claude-haiku-5-5", mainModel: "claude-sonnet-5-5", openaiModel: "gpt-4.1-mini",
  keywords: "한국어 의학 강의. 영어 의학 용어와 약어가 섞여 있음: Streptococcus pneumoniae, β-lactam, macrolide, fluoroquinolone, CURB-65, BUN, mg/dL, mmHg, PaO2/FiO2.",
  correct: true, showSample: true,
};

/* ───────── 저장: IndexedDB (강의·음성) ───────── */
const IDB = (() => {
  let dbp;
  const open = () => dbp || (dbp = new Promise((res, rej) => {
    const r = indexedDB.open("knuts", 1);
    r.onupgradeneeded = () => { const d = r.result; d.createObjectStore("lectures", { keyPath: "id" }); d.createObjectStore("audio"); };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  }));
  const tx = async (name, mode, fn) => {
    const d = await open();
    return new Promise((res, rej) => {
      const t = d.transaction(name, mode), req = fn(t.objectStore(name));
      t.oncomplete = () => res(req && req.result);
      t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
    });
  };
  return {
    all: () => tx("lectures", "readonly", (s) => s.getAll()),
    put: (l) => tx("lectures", "readwrite", (s) => s.put(l)),
    del: (id) => tx("lectures", "readwrite", (s) => s.delete(id)),
    getAudio: (id) => tx("audio", "readonly", (s) => s.get(id)),
    putAudio: (id, b) => tx("audio", "readwrite", (s) => s.put(b, id)),
    delAudio: (id) => tx("audio", "readwrite", (s) => s.delete(id)),
  };
})();
const clone = (x) => JSON.parse(JSON.stringify(x));

/* ───────── AI 호출 ───────── */
const BLOCKED = "API 서버에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.";
async function extFetch(url, opt) { try { return await fetch(url, opt); } catch { throw new Error(BLOCKED); } }
const aiReady = (cfg) => (cfg.llm === "anthropic" ? !!cfg.anthropicKey : !!cfg.openaiKey);
async function llmCall(cfg, prompt, { fast = false, maxTokens = 8000 } = {}) {
  if (cfg.llm === "anthropic") {
    if (!cfg.anthropicKey) throw new Error("설정에서 Anthropic API 키를 입력해 주세요.");
    const r = await extFetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": cfg.anthropicKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({ model: fast ? cfg.fastModel : cfg.mainModel, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error("Anthropic API 오류: " + ((j.error && j.error.message) || r.status));
    return (j.content || []).map((c) => c.text || "").join("");
  }
  if (!cfg.openaiKey) throw new Error("설정에서 OpenAI API 키를 입력해 주세요.");
  const r = await extFetch("https://api.openai.com/v1/chat/completions", {
    method: "POST", headers: { "content-type": "application/json", Authorization: "Bearer " + cfg.openaiKey },
    body: JSON.stringify({ model: cfg.openaiModel, response_format: { type: "json_object" }, messages: [{ role: "user", content: prompt }] }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error("OpenAI API 오류: " + ((j.error && j.error.message) || r.status));
  return j.choices[0].message.content;
}
async function llmJSON(cfg, prompt, opt) {
  const t = await llmCall(cfg, prompt, opt);
  const a = t.indexOf("{"), b = t.lastIndexOf("}");
  if (a < 0 || b < a) throw new Error("AI 응답을 해석하지 못했어요.");
  return JSON.parse(t.slice(a, b + 1));
}

/* ───────── 전사 ───────── */
async function transcribe(file, cfg, onPart) {
  if (!cfg.openaiKey) throw new Error("설정에서 OpenAI API 키(음성 전사용)를 입력해 주세요.");
  const LIMIT = 25 * 1024 * 1024, CH = 20 * 1024 * 1024;
  let parts = [file];
  if (file.size > LIMIT) {
    if (!/\.mp3$/i.test(file.name) && file.type !== "audio/mpeg") throw new Error("25MB가 넘는 파일은 MP3만 자동으로 나눌 수 있어요. MP3로 변환해서 올려 주세요.");
    parts = [];
    for (let o = 0; o < file.size; o += CH) parts.push(new File([file.slice(o, o + CH)], `part${parts.length + 1}.mp3`, { type: "audio/mpeg" }));
  }
  let offset = 0, prev = "";
  const out = [];
  for (let i = 0; i < parts.length; i++) {
    onPart(i, parts.length);
    const fd = new FormData();
    fd.append("file", parts[i]);
    fd.append("model", cfg.whisperModel || "whisper-1");
    fd.append("language", "ko");
    fd.append("response_format", "verbose_json");
    fd.append("timestamp_granularities[]", "segment");
    fd.append("prompt", (cfg.keywords.slice(0, 400) + " " + prev).trim());
    const r = await extFetch("https://api.openai.com/v1/audio/transcriptions", { method: "POST", headers: { Authorization: "Bearer " + cfg.openaiKey }, body: fd });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error("전사 실패: " + ((j.error && j.error.message) || r.status));
    const ss = j.segments && j.segments.length ? j.segments : [{ start: 0, end: j.duration || 0, text: j.text || "" }];
    ss.forEach((s) => out.push({ start: s.start + offset, end: s.end + offset, text: String(s.text || "").trim() }));
    offset += j.duration || ss[ss.length - 1].end;
    prev = String(j.text || "").slice(-200);
  }
  return out;
}
const parseTime = (s) => { const p = s.replace(",", ".").split(":").map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + p[1]; };
function parseTranscript(text, name) {
  text = text.replace(/\r/g, "").replace(/^﻿/, "");
  if (/\.json$/i.test(name)) {
    const j = JSON.parse(text), ss = Array.isArray(j) ? j : j.segments || [];
    return ss.map((s) => ({ start: +s.start || 0, end: +s.end || +s.start || 0, text: String(s.text || "").trim() }));
  }
  if (/-->/.test(text)) {
    const out = [];
    text.split(/\n\n+/).forEach((b) => {
      const lines = b.split("\n"), k = lines.findIndex((l) => l.includes("-->"));
      if (k < 0) return;
      const m = lines[k].match(/([\d:.,]+)\s*-->\s*([\d:.,]+)/);
      if (m) out.push({ start: parseTime(m[1]), end: parseTime(m[2]), text: lines.slice(k + 1).join(" ").replace(/<[^>]+>/g, "").trim() });
    });
    return out;
  }
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const ms = lines.map((l) => l.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*(.*)$/));
  if (ms.filter(Boolean).length >= lines.length * 0.5) {
    const out = [];
    ms.forEach((m, i) => { if (m) out.push({ start: parseTime(m[1]), text: m[2] }); else if (out.length) out[out.length - 1].text += " " + lines[i]; });
    out.forEach((s, i) => (s.end = out[i + 1] ? out[i + 1].start : s.start + 30));
    return out;
  }
  let t = 0;
  return lines.map((l) => { const s = { start: t, end: t + l.length / 4.5, text: l }; t = s.end; return s; });
}
function toParas(segs) {
  const out = [];
  let cur = null;
  for (const s of segs) {
    if (!s.text) continue;
    if (!cur) cur = { t: s.start, end: s.end, raw: s.text };
    else { cur.raw += " " + s.text; cur.end = s.end; }
    const d = cur.end - cur.t;
    if ((d >= 40 && /[.?!다요죠까]\s*$/.test(cur.raw)) || d >= 75) { out.push(cur); cur = null; }
  }
  if (cur) out.push(cur);
  return out.map((p, i, a) => ({ id: i, t: Math.floor(p.t), end: a[i + 1] ? Math.floor(a[i + 1].t) : Math.ceil(p.end), raw: p.raw.trim(), text: p.raw.trim() }));
}

/* ───────── 교정 · 요약 ───────── */
const toSec = (x) => { if (typeof x === "number") return x; const m = String(x || "").match(/(\d+):(\d{2})/); return m ? +m[1] * 60 + +m[2] : 0; };
const snap = (segs, sec) => { let b = segs[0].t; for (const s of segs) if (s.t <= sec) b = s.t; return b; };
const segAt = (segs, sec) => { let b = segs[0]; for (const s of segs) if (s.t <= sec) b = s; return b; };
const arr = (x) => (Array.isArray(x) ? x : []);
const str = (x) => (x == null ? "" : String(x));
const transcriptText = (lec) => lec.segs.map((s) => `[${fmt(s.t)}] ${s.text}`).join("\n");

async function correctBatch(lec, k, cfg) {
  const B = 10, items = lec.segs.slice(k * B, k * B + B).map((s) => ({ i: s.id, text: s.raw }));
  const j = await llmJSON(cfg, `너는 의과대학 강의 전사 교정자다. 아래는 한국어 의학 강의를 음성인식(STT)으로 받아 적은 문단들이다. 강의 정보: ${cfg.keywords}
규칙:
- 한글 발음으로 깨진 영어 의학 용어를 정식 표기로 복원한다 (예: "스트렙토 코커스 뉴모니에"→"Streptococcus pneumoniae", "커브 육십오"→"CURB-65", "베타 락탐"→"β-lactam").
- 균 학명은 속명 대문자, 약어·단위는 표준 표기(BUN, mg/dL, mmHg, PaO2/FiO2), 수치는 아라비아 숫자로 쓴다.
- "어", "음", "그" 같은 군말과 말 반복을 지우고 문장 부호를 넣는다.
- 교수님이 말하지 않은 내용은 절대 추가하지 않는다. 확신할 수 없는 단어는 원문을 두고 뒤에 [?]를 붙인다.
- 강조 표현("꼭 외우세요", "시험에 나옵니다", "중요합니다" 등)은 그대로 살린다.
JSON만 출력: {"items":[{"i":번호,"text":"교정문"}]}
입력: ${JSON.stringify(items)}`, { fast: true, maxTokens: 8000 });
  arr(j.items).forEach((it) => { const s = lec.segs.find((x) => x.id === +it.i); if (s && str(it.text).trim()) s.text = str(it.text).trim(); });
}
async function makeSummary(lec, cfg) {
  const j = await llmJSON(cfg, `너는 의대 강의 요약 조교다. 아래 전사본만 근거로 요약한다. 각 줄 앞 [MM:SS]는 발화 시점이다.
JSON만 출력:
{"title":"강의 제목(25자 이내)",
"outline":[{"t":"MM:SS","title":"대주제","sub":"한 줄 설명"}],
"concepts":[{"title":"개념 카드 제목","refs":["MM:SS"],"rows":[["항목","내용"]]}],
"mechs":[{"title":"질문형 제목","refs":["MM:SS"],"lecture":"강의에서 말한 내용 요약","extra":"강의에 없는 교과서 보충 기전, 없으면 빈 문자열"}],
"keylines":[{"t":"MM:SS","line":"시험용 한 줄 요약"}]}
분량: outline 5~10개(시간 순), concepts 4~8개(정의·분류·진단 기준·수치), mechs 4~8개(병태생리·약물 작용점·감별), keylines 6~12개(교수님이 강조했거나 출제 가능성이 높은 지점).
규칙: 수치·기준은 강의에서 말한 그대로 쓴다. lecture와 concepts에는 강의 밖 내용을 넣지 않는다.
전사본:
${transcriptText(lec)}`, { maxTokens: 8000 });
  const refs = (r) => [...new Set(arr(r).map((x) => snap(lec.segs, toSec(x))))];
  const keylines = {};
  arr(j.keylines).forEach((k) => { const s = segAt(lec.segs, toSec(k.t)); if (str(k.line)) keylines[s.id] = str(k.line); });
  return {
    aiTitle: str(j.title),
    outline: arr(j.outline).map((o) => ({ t: snap(lec.segs, toSec(o.t)), title: str(o.title), sub: str(o.sub) })).filter((o) => o.title),
    concepts: arr(j.concepts).map((c) => ({ title: str(c.title), refs: refs(c.refs), rows: arr(c.rows).filter((r) => Array.isArray(r) && r.length >= 2).map((r) => [str(r[0]), str(r[1])]) })).filter((c) => c.title && c.rows.length),
    mechs: arr(j.mechs).map((m) => ({ title: str(m.title), refs: refs(m.refs), lecture: str(m.lecture), extra: str(m.extra) })).filter((m) => m.title),
    keylines,
  };
}

/* 남은 단계를 이어서 처리: 교정 → 요약. 단계마다 저장 */
async function processLecture(lec, cfg, onStep, save) {
  const B = 10, n = Math.ceil(lec.segs.length / B);
  if (cfg.correct && !lec.status.corrected) {
    for (let k = lec.status.correctedBatches || 0; k < n; k++) {
      onStep("correct", k / n, `의학 용어 교정 ${k + 1}/${n}`);
      await correctBatch(lec, k, cfg);
      lec.status.correctedBatches = k + 1;
      await save(lec);
    }
    lec.status.corrected = true;
    await save(lec);
  }
  if (!lec.status.summarized) {
    onStep("summary", 0, "3단계 요약 · 중요 내용 정리");
    const s = await makeSummary(lec, cfg);
    if (!lec.userTitle && s.aiTitle) lec.title = s.aiTitle;
    delete s.aiTitle;
    Object.assign(lec, s);
    lec.status.summarized = true;
    await save(lec);
  }
  onStep("done", 1, "완료");
}

/* ───────── 공용 UI ───────── */
function Sheet({ title, onClose, children, wide, locked }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && !locked && onClose();
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [locked]);
  return (
    <div className="scrim" onClick={() => !locked && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className={"sheet " + (wide ? "sheet-wide" : "")} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-[20px] font-bold m-0">{title}</h2>
          {!locked && <button className="btn ghost" aria-label="닫기" onClick={onClose}><Ic d={I.x} s={20} /></button>}
        </div>
        {children}
      </div>
    </div>
  );
}
const Field = ({ label, hint, children }) => (
  <label className="flex flex-col gap-1.5 mb-4">
    <span className="text-[14px] font-bold">{label}</span>
    {children}
    {hint && <span className="text-[13px] mute">{hint}</span>}
  </label>
);
function Seg({ value, options, onChange, label }) {
  return (
    <div className="segctl" role="tablist" aria-label={label}>
      {options.map(([v, l]) => <button key={v} role="tab" aria-selected={value === v} className={value === v ? "on" : ""} onClick={() => onChange(v)}>{l}</button>)}
    </div>
  );
}
function TBadge({ t, onJump }) {
  return <button className="tbadge tnum" aria-label={`${fmt(t)} 시점으로 이동`} onClick={(e) => { e.stopPropagation(); onJump(t); }}>{fmt(t)}</button>;
}
const fmtDate = (ms) => new Date(ms).toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });
const fmtLong = (s) => { s = Math.round(s || 0); const h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return h ? `${h}시간 ${m}분` : `${m}분`; };

/* ───────── 앱 ───────── */
function App() {
  const [cfg, setCfg] = useState(() => ({ ...DEFAULT_CFG, ...store.get("knuts.cfg", {}) }));
  useEffect(() => { store.set("knuts.cfg", cfg); }, [cfg]);
  const [lectures, setLectures] = useState(null);
  const [route, setRoute] = useState(location.hash);
  const [sheet, setSheet] = useState(null);
  const [toast, setToast] = useState(null);
  const [jobs, setJobs] = useState({}); // id → {pct,label,error}

  useEffect(() => { IDB.all().then((l) => setLectures(l || [])).catch(() => { setLectures([]); setToast("이 브라우저에서 저장소를 열 수 없어요."); }); }, []);
  useEffect(() => { const h = () => setRoute(location.hash); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h); }, []);
  useEffect(() => { if (!toast) return; const h = setTimeout(() => setToast(null), 4500); return () => clearTimeout(h); }, [toast]);

  const latest = useRef({});
  useEffect(() => { (lectures || []).forEach((l) => (latest.current[l.id] = l)); }, [lectures]);
  const save = async (l) => {
    const c = clone(l);
    latest.current[c.id] = c;
    await IDB.put(c);
    setLectures((ls) => [...(ls || []).filter((x) => x.id !== c.id), c]);
  };
  /* 처리 작업이 저장할 때 사용자가 그사이 바꾼 마킹·제목은 지킨다 */
  const saveFromJob = (l) => {
    const cur = latest.current[l.id];
    return save(cur ? { ...l, marks: cur.marks, hasAudio: cur.hasAudio, audioName: cur.audioName, ...(cur.userTitle ? { title: cur.title, userTitle: true } : {}) } : l);
  };
  const remove = async (id) => {
    await IDB.del(id); await IDB.delAudio(id).catch(() => {});
    delete latest.current[id];
    setLectures((ls) => ls.filter((x) => x.id !== id));
    location.hash = "";
  };
  const run = async (given) => {
    const id = given.id;
    const lec = latest.current[id] || given;
    let lock = null;
    try { lock = navigator.wakeLock && (await navigator.wakeLock.request("screen")); } catch {}
    setJobs((j) => ({ ...j, [id]: { pct: 0, label: "준비 중" } }));
    try {
      const work = clone(lec);
      await processLecture(work, cfg, (step, pct, label) => setJobs((j) => ({ ...j, [id]: { step, pct, label } })), saveFromJob);
      setJobs((j) => { const n = { ...j }; delete n[id]; return n; });
    } catch (e) {
      setJobs((j) => ({ ...j, [id]: { error: e.message || String(e) } }));
    }
    try { lock && lock.release(); } catch {}
  };

  const m = route.match(/^#l-(.+)$/);
  const list = lectures || [];
  const all = cfg.showSample ? [...list, SAMPLE] : list;
  const lec = m ? all.find((l) => l.id === decodeURIComponent(m[1])) : null;

  return (
    <>
      {lec ? (
        <LectureView key={lec.id} lec={lec} cfg={cfg} save={save} job={jobs[lec.id]} run={() => run(lec)} remove={() => remove(lec.id)} openSettings={() => setSheet("settings")} toast={setToast} />
      ) : (
        <Home lectures={list} cfg={cfg} jobs={jobs} loading={!lectures} onNew={() => setSheet("new")} onSettings={() => setSheet("settings")} />
      )}
      {sheet === "settings" && <SettingsSheet cfg={cfg} setCfg={setCfg} lectures={list} save={save} toast={setToast} onClose={() => setSheet(null)} />}
      {sheet === "new" && <NewSheet cfg={cfg} save={save} openSettings={() => setSheet("settings")} onClose={() => setSheet(null)}
        onCreated={(l) => { setSheet(null); location.hash = "l-" + l.id; run(l); }} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}

/* ───────── 홈 ───────── */
function Home({ lectures, cfg, jobs, loading, onNew, onSettings }) {
  const sorted = [...lectures].sort((a, b) => b.created - a.created);
  const needKeys = !cfg.openaiKey || !aiReady(cfg);
  const Item = ({ l }) => {
    const job = jobs[l.id], st = l.status || {};
    const state = l.sample ? "샘플" : job ? (job.error ? "처리 중단됨" : "처리 중") : st.summarized ? null : "이어서 처리 필요";
    const marks = (l.marks || []).length;
    return (
      <a href={"#l-" + encodeURIComponent(l.id)} className="card lec-item">
        <div className="flex-1 min-w-0">
          <div className="text-[13px] mute">{l.sample ? l.course : fmtDate(l.created)} · {fmtLong(l.duration)}</div>
          <div className="text-[18px] font-bold leading-snug mt-0.5">{l.title}</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {state && <span className={"chip " + (state === "샘플" ? "" : job && !job.error ? "chip-teal" : "chip-rose")}>{state}</span>}
            {st.summarized && <span className="chip">요약 완료</span>}
            {Object.keys(l.keylines || {}).length > 0 && <span className="chip chip-hl">중요 {Object.keys(l.keylines).length}</span>}
            {marks > 0 && <span className="chip chip-rose">내 마킹 {marks}</span>}
          </div>
        </div>
        <Ic d={I.right} s={22} />
      </a>
    );
  };
  return (
    <div className="min-h-screen">
      <header className="appbar">
        <div className="wrap flex items-center gap-3 py-3">
          <div className="flex-1">
            <div className="text-[13px] opacity-80">KNU Transcription &amp; Summary</div>
            <h1 className="text-[26px] font-bold leading-tight m-0">KNUTS</h1>
          </div>
          <button className="btn bar-btn" onClick={onSettings}>설정</button>
        </div>
      </header>
      <main className="wrap py-6">
        <button className="newbtn" onClick={onNew}>
          <span className="newbtn-plus" aria-hidden="true">＋</span>
          <span className="text-left"><b className="block text-[18px]">새 강의 추가</b><span className="text-[14px] opacity-85">MP3를 올리면 전사 → 의학 용어 교정 → 요약까지 자동으로</span></span>
        </button>
        {needKeys && (
          <div className="card p-4 mt-4 flex flex-wrap items-center gap-3" style={{ borderColor: "var(--hl-bar)" }}>
            <div className="flex-1 min-w-[220px]"><b>먼저 API 키를 넣어 주세요.</b><div className="text-[14px] mute">음성 전사는 OpenAI 키, 교정·요약은 Anthropic(또는 OpenAI) 키를 씁니다. 키는 이 기기에만 저장돼요.</div></div>
            <button className="btn primary" onClick={onSettings}>키 입력</button>
          </div>
        )}
        <h2 className="text-[15px] font-bold mute mt-8 mb-3">내 강의 {sorted.length > 0 && <span className="tnum">{sorted.length}</span>}</h2>
        {loading ? <p className="mute">불러오는 중…</p> : sorted.length === 0 ? (
          <p className="card p-5 m-0 mute">아직 추가한 강의가 없어요. 아래 샘플 강의로 화면을 먼저 둘러보세요.</p>
        ) : <div className="grid gap-3 md:grid-cols-2">{sorted.map((l) => <Item key={l.id} l={l} />)}</div>}
        {cfg.showSample && <>
          <h2 className="text-[15px] font-bold mute mt-8 mb-3">샘플</h2>
          <div className="grid gap-3 md:grid-cols-2"><Item l={SAMPLE} /></div>
        </>}
        <p className="text-[13px] mute mt-10">아이패드 Safari에서 공유 버튼 → ‘홈 화면에 추가’를 누르면 앱처럼 쓸 수 있어요. 강의 데이터는 이 기기 브라우저에만 저장되니, 가끔 설정에서 백업을 내려받아 두세요.</p>
      </main>
    </div>
  );
}

/* ───────── 새 강의 ───────── */
function NewSheet({ cfg, save, onClose, onCreated, openSettings }) {
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState(null);
  const [tfile, setTfile] = useState(null);
  const [state, setState] = useState(null); // {label,pct}
  const [err, setErr] = useState("");
  const running = !!state;
  const start = async () => {
    setErr("");
    let lock = null;
    try { lock = navigator.wakeLock && (await navigator.wakeLock.request("screen")); } catch {}
    try {
      let raw;
      if (tfile) { setState({ label: "전사 파일 읽는 중", pct: 0.1 }); raw = parseTranscript(await tfile.text(), tfile.name); }
      else raw = await transcribe(audio, cfg, (i, n) => setState({ label: `음성 전사 ${i + 1}/${n} — 1시간 강의는 보통 2~4분 걸려요`, pct: i / n }));
      if (!raw.length) throw new Error("전사 결과가 비어 있어요.");
      const segs = toParas(raw);
      const id = "L" + Date.now().toString(36);
      const lec = { id, created: Date.now(), title: title.trim() || (audio || tfile).name.replace(/\.[^.]+$/, ""), userTitle: !!title.trim(),
        duration: segs[segs.length - 1].end, segs, outline: [], concepts: [], mechs: [], keylines: {}, marks: [],
        status: { transcribed: true, corrected: !cfg.correct, summarized: false }, audioName: audio ? audio.name : "" };
      setState({ label: "저장 중", pct: 1 });
      if (audio) {
        try { await IDB.putAudio(id, audio); lec.hasAudio = true; if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); }
        catch { lec.hasAudio = false; }
      }
      await save(lec);
      onCreated(lec);
    } catch (e) { setErr(e.message || String(e)); setState(null); }
    try { lock && lock.release(); } catch {}
  };
  const mb = (f) => (f.size / 1048576).toFixed(1) + "MB";
  return (
    <Sheet title="새 강의 추가" onClose={onClose} wide locked={running}>
      <Field label="강의 제목" hint="비워 두면 AI가 내용을 보고 제목을 붙여요.">
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 감염내과 3강 – 요로감염" disabled={running} />
      </Field>
      <div className="grid gap-3 sm:grid-cols-2 mb-2">
        <label className={"pick " + (audio ? "on" : "")}>
          <b>강의 음성 파일</b>
          <span className="text-[13px] mute">MP3 권장 · 1시간 단위. 25MB가 넘으면 20MB씩 나눠 전사합니다.</span>
          <span className="pick-file">{audio ? `${audio.name} · ${mb(audio)}` : "파일 선택"}</span>
          <input type="file" accept="audio/*,.mp3,.m4a,.wav,.mp4" className="sr-only" disabled={running} onChange={(e) => { setAudio(e.target.files[0] || null); setTfile(null); setErr(""); }} />
        </label>
        <label className={"pick " + (tfile ? "on" : "")}>
          <b>또는 전사 파일</b>
          <span className="text-[13px] mute">.srt · .vtt · Whisper .json · [MM:SS] 붙은 .txt</span>
          <span className="pick-file">{tfile ? tfile.name : "파일 선택"}</span>
          <input type="file" accept=".srt,.vtt,.json,.txt,text/*,application/json" className="sr-only" disabled={running} onChange={(e) => { setTfile(e.target.files[0] || null); setAudio(null); setErr(""); }} />
        </label>
      </div>
      {audio && audio.size > 25 * 1048576 && !/\.mp3$/i.test(audio.name) && <p className="text-[14px] rose">25MB가 넘는 {audio.name.split(".").pop()} 파일은 나눌 수 없어요. MP3로 변환해서 올려 주세요.</p>}
      {audio && !cfg.openaiKey && <p className="text-[14px] rose">음성 전사에는 OpenAI API 키가 필요해요. <button className="link" onClick={openSettings}>설정 열기</button></p>}
      {!aiReady(cfg) && <p className="text-[13px] mute">교정·요약용 AI 키가 없으면 전사만 저장되고, 키를 넣은 뒤 강의 화면에서 이어서 처리할 수 있어요.</p>}
      {state && (
        <div className="mt-3">
          <div className="text-[15px] font-medium mb-2">{state.label}</div>
          <div className="progress"><div style={{ width: Math.max(4, state.pct * 100) + "%" }} /></div>
          <p className="text-[13px] mute mt-2">화면을 켜 둔 채로 이 앱을 떠나지 말아 주세요.</p>
        </div>
      )}
      {err && <p className="text-[14px] font-medium rose mt-3">{err}</p>}
      <div className="flex justify-end gap-2 mt-5">
        <button className="btn soft" disabled={running} onClick={onClose}>취소</button>
        <button className="btn primary" disabled={running || (!audio && !tfile) || (audio && !cfg.openaiKey)} onClick={start}>{running ? "처리 중…" : "전사 시작"}</button>
      </div>
    </Sheet>
  );
}

/* ───────── 설정 ───────── */
function SettingsSheet({ cfg, setCfg, lectures, save, toast, onClose }) {
  const set = (k) => (e) => setCfg((c) => ({ ...c, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const [usage, setUsage] = useState("");
  useEffect(() => { navigator.storage && navigator.storage.estimate && navigator.storage.estimate().then((e) => setUsage(`${(e.usage / 1048576).toFixed(0)}MB 사용 중`)).catch(() => {}); }, []);
  const exportAll = () => {
    const blob = new Blob([JSON.stringify({ app: "knuts", version: 1, exported: Date.now(), lectures }, null, 0)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `knuts-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };
  const importAll = async (f) => {
    try {
      const j = JSON.parse(await f.text());
      const ls = arr(j.lectures).filter((l) => l && l.id && Array.isArray(l.segs));
      for (const l of ls) await save({ ...l, hasAudio: false });
      toast(`강의 ${ls.length}개를 가져왔어요. 음성 파일은 강의 화면에서 다시 연결하세요.`);
    } catch { toast("백업 파일을 읽지 못했어요."); }
  };
  const ok = (v) => <span className={v ? "chip chip-teal" : "chip chip-rose"}>{v ? "입력됨" : "필요"}</span>;
  return (
    <Sheet title="설정" onClose={onClose} wide>
      <section className="setsec">
        <h3>음성 전사 · OpenAI Whisper {ok(!!cfg.openaiKey)}</h3>
        <Field label="OpenAI API 키" hint="platform.openai.com에서 발급. 1시간 강의 전사 비용은 약 $0.36입니다.">
          <input className="input" type="password" autoComplete="off" value={cfg.openaiKey} onChange={set("openaiKey")} placeholder="sk-..." />
        </Field>
        <Field label="과목 · 용어 힌트" hint="Whisper와 교정 AI에 함께 전달돼요. 이번 학기 과목과 자주 나오는 영어 용어를 적으면 정확도가 올라갑니다.">
          <textarea className="input" rows={3} value={cfg.keywords} onChange={set("keywords")} />
        </Field>
        <details className="mb-2"><summary className="text-[14px] mute cursor-pointer">고급: 전사 모델</summary>
          <Field label="모델" hint="타임스탬프를 주는 whisper-1 기준입니다. OpenAI가 2027년 2월 whisper-1 종료를 예고했어요."><input className="input" value={cfg.whisperModel} onChange={set("whisperModel")} /></Field>
        </details>
      </section>
      <section className="setsec">
        <h3>의학 교정 · 요약 AI {ok(aiReady(cfg))}</h3>
        <Field label="AI 엔진">
          <select className="input" value={cfg.llm} onChange={set("llm")}>
            <option value="anthropic">Claude (Anthropic API 키)</option>
            <option value="openai">OpenAI (위 OpenAI 키 사용)</option>
          </select>
        </Field>
        {cfg.llm === "anthropic" ? <>
          <Field label="Anthropic API 키" hint="console.anthropic.com에서 발급.">
            <input className="input" type="password" autoComplete="off" value={cfg.anthropicKey} onChange={set("anthropicKey")} placeholder="sk-ant-..." />
          </Field>
          <details className="mb-2"><summary className="text-[14px] mute cursor-pointer">고급: 모델</summary>
            <Field label="교정 모델 (빠르고 저렴)"><input className="input" value={cfg.fastModel} onChange={set("fastModel")} /></Field>
            <Field label="요약 모델"><input className="input" value={cfg.mainModel} onChange={set("mainModel")} /></Field>
          </details>
        </> : <Field label="모델"><input className="input" value={cfg.openaiModel} onChange={set("openaiModel")} /></Field>}
        <label className="check"><input type="checkbox" checked={cfg.correct} onChange={set("correct")} /> 전사 후 의학 용어 교정 (권장)</label>
      </section>
      <section className="setsec">
        <h3>데이터</h3>
        <p className="text-[14px] mute mt-0">강의와 음성은 이 기기 브라우저에만 저장돼요{usage ? ` · ${usage}` : ""}. API 키는 백업에 포함되지 않습니다.</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn soft" onClick={exportAll} disabled={!lectures.length}>백업 내려받기</button>
          <label className="btn soft cursor-pointer">백업 가져오기<input type="file" accept=".json,application/json" className="sr-only" onChange={(e) => { e.target.files[0] && importAll(e.target.files[0]); e.target.value = ""; }} /></label>
          <button className="btn ghost rose" onClick={() => { setCfg((c) => ({ ...c, openaiKey: "", anthropicKey: "" })); toast("API 키를 지웠어요."); }}>API 키 지우기</button>
        </div>
        <label className="check mt-3"><input type="checkbox" checked={cfg.showSample} onChange={set("showSample")} /> 샘플 강의 보이기</label>
      </section>
      <div className="flex justify-end"><button className="btn primary" onClick={onClose}>완료</button></div>
    </Sheet>
  );
}

/* ───────── 강의 화면 ───────── */
function LectureView({ lec, cfg, save, job, run, remove, openSettings, toast }) {
  const [tab, setTab] = useState("tx");
  const [marks, setMarks] = useState(() => (lec.sample ? store.get("knuts.marks.sample", []) : lec.marks || []));
  const [media, setMedia] = useState(null); // {url,isVideo,name}
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [mediaDur, setMediaDur] = useState(0);
  const [view, setView] = useState("clean");
  const [onlyKey, setOnlyKey] = useState(false);
  const [query, setQuery] = useState("");
  const [follow, setFollow] = useState(true);
  const [term, setTerm] = useState(null);
  const [flash, setFlash] = useState(null);
  const [menu, setMenu] = useState(null);
  const [level, setLevel] = useState(1);
  const mediaRef = useRef(null), listRef = useRef(null), barRef = useRef(null), segRefs = useRef({});
  const segs = lec.segs, kl = lec.keylines || {};
  const dur = media ? mediaDur || lec.duration : lec.duration;

  /* 음성 불러오기 */
  useEffect(() => {
    let url = null, on = true;
    if (lec.hasAudio) IDB.getAudio(lec.id).then((b) => { if (b && on) { url = URL.createObjectURL(b); setMedia({ url, isVideo: /video/.test(b.type), name: lec.audioName || "강의 음성" }); } }).catch(() => {});
    return () => { on = false; url && URL.revokeObjectURL(url); };
  }, [lec.id, lec.hasAudio]);

  /* 마킹 저장 */
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const h = setTimeout(() => { if (lec.sample) store.set("knuts.marks.sample", marks); else save({ ...lec, marks }); }, 600);
    return () => clearTimeout(h);
  }, [marks]);

  /* 음성 없을 때 가상 재생 */
  useEffect(() => {
    if (media || !playing) return;
    let raf, last = performance.now();
    const step = (now) => {
      const dt = (now - last) / 1000; last = now;
      setTime((t) => { const n = t + dt * rate; if (n >= lec.duration) { setPlaying(false); return lec.duration; } return n; });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, rate, media]);
  useEffect(() => { if (mediaRef.current) mediaRef.current.playbackRate = rate; }, [rate, media]);

  const play = (from) => {
    if (media && mediaRef.current) { const p = mediaRef.current.play(); p && p.catch && p.catch(() => setPlaying(false)); }
    else { if ((from ?? time) >= lec.duration) setTime(0); setPlaying(true); }
  };
  const pause = () => (media && mediaRef.current ? mediaRef.current.pause() : setPlaying(false));
  const toggle = () => (playing ? pause() : play());
  const seek = (t, andPlay) => {
    const v = Math.min(Math.max(0, t), dur);
    setTime(v);
    if (media && mediaRef.current) mediaRef.current.currentTime = v;
    if (andPlay) play(v);
  };
  const jump = (t) => { setTab("tx"); setFollow(true); seek(t, true); };

  const addMark = () => {
    const t = Math.floor(time), id = Date.now();
    setMarks((ms) => [...ms, { id, t, note: "" }].sort((a, b) => a.t - b.t));
    setFlash({ id, t });
    setTimeout(() => setFlash((f) => (f && f.id === id ? null : f)), 1800);
  };
  useEffect(() => {
    const h = (e) => {
      if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || document.querySelector(".scrim")) return;
      if (e.code === "Space") { e.preventDefault(); toggle(); }
      else if (e.key === "m" || e.key === "M" || e.key === "ㅡ") addMark();
      else if (e.key === "ArrowLeft") seek(time - 10);
      else if (e.key === "ArrowRight") seek(time + 10);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const attach = async (f) => {
    if (!f) return;
    if (media) URL.revokeObjectURL(media.url);
    setMedia({ url: URL.createObjectURL(f), isVideo: /video|mp4|mov/i.test(f.type + f.name), name: f.name });
    setPlaying(false); setTime(0);
    if (!lec.sample) { try { await IDB.putAudio(lec.id, f); await save({ ...lec, marks, hasAudio: true, audioName: f.name }); } catch { toast("음성을 저장하지 못했어요. 이번 사용 중에만 재생됩니다."); } }
  };

  const activeIdx = useMemo(() => { let i = 0; for (const s of segs) if (s.t <= time) i = s.id; return i; }, [time, segs]);
  const info = useMemo(() => segs.map((s) => ({ auto: EMPH_RE.test(s.text), manual: marks.filter((m) => m.t >= s.t && m.t < s.end), ai: !!kl[s.id] && !lec.sample })), [marks, segs, kl]);
  const isKey = (i) => info[i] && (info[i].auto || info[i].manual.length || info[i].ai);
  const keyCount = segs.filter((s) => isKey(s.id)).length;
  const visible = segs.filter((s) => (!onlyKey || isKey(s.id)) && (!query || (view === "clean" ? s.text : s.raw || "").toLowerCase().includes(query.toLowerCase())));

  useEffect(() => {
    if (!follow || tab !== "tx") return;
    const box = listRef.current, el = segRefs.current[activeIdx];
    if (!box || !el) return;
    const top = el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
    box.scrollTo({ top: top - box.clientHeight / 3, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [activeIdx, follow, tab, onlyKey]);
  const onBar = (e) => { const r = barRef.current.getBoundingClientRect(); seek((Math.min(Math.max(e.clientX - r.left, 0), r.width) / r.width) * dur); };

  /* 중요 내용 카드 */
  const cards = [];
  segs.forEach((s) => {
    const inf = info[s.id];
    if (!inf) return;
    if (inf.auto) cards.push({ key: "a" + s.id, t: s.t, kind: "auto", tag: `“${(s.text.match(EMPH_RE) || [])[0]}”`, line: kl[s.id] || firstSentence(s.text) });
    else if (inf.ai) cards.push({ key: "k" + s.id, t: s.t, kind: "ai", tag: "AI 선정", line: kl[s.id] });
  });
  marks.forEach((mk) => { const s = segAt(segs, mk.t); cards.push({ key: "m" + mk.id, t: mk.t, kind: "manual", tag: mk.note ? `내 마킹 · ${mk.note}` : "내 마킹", line: kl[s.id] || firstSentence(s.text) }); });
  cards.sort((a, b) => a.t - b.t);

  const st = lec.status || {};
  const pending = !lec.sample && !st.summarized;
  const tabs = [["tx", "전사본"], ["key", `중요 내용 ${cards.length}`], ["sum", "요약"]];

  return (
    <div className="min-h-screen pb-16">
      <header className="appbar sticky top-0 z-20">
        <div className="wrap flex items-center gap-2 py-2">
          <a href="#" className="btn bar-btn" aria-label="강의 목록"><Ic d={I.left} s={22} /></a>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] opacity-80 truncate">{lec.sample ? lec.course : fmtDate(lec.created)} · {fmtLong(lec.duration)}</div>
            <h1 className="text-[18px] sm:text-[20px] font-bold leading-tight m-0 truncate">{lec.title}</h1>
          </div>
          {!lec.sample && <button className="btn bar-btn" onClick={() => setMenu("menu")}>더보기</button>}
        </div>
        <div className="wrap pb-3">
          <div className="player">
            <button className="btn play" onClick={toggle} aria-label={playing ? "일시정지" : "재생"}><Ic d={playing ? I.pause : I.play} s={22} /></button>
            <button className="btn bar-btn hide-xs" onClick={() => seek(time - 10)} aria-label="10초 뒤로"><Ic d={I.back} /></button>
            <button className="btn bar-btn hide-xs" onClick={() => seek(time + 10)} aria-label="10초 앞으로"><Ic d={I.fwd} /></button>
            <span className="tnum text-[13px] w-[44px] text-right">{fmt(time)}</span>
            <div ref={barRef} className="tl" role="slider" tabIndex={0} aria-label="재생 위치" aria-valuemin={0} aria-valuemax={Math.floor(dur)} aria-valuenow={Math.floor(time)} aria-valuetext={fmt(time)}
              onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); onBar(e); }} onPointerMove={(e) => { if (e.buttons) onBar(e); }}>
              <div className="tl-track" />
              <div className="tl-fill" style={{ width: Math.min(100, (time / dur) * 100) + "%" }} />
              {segs.map((s) => info[s.id] && (info[s.id].auto || info[s.id].ai) && s.t <= dur && <i key={s.id} className="tl-tick hl" style={{ left: (s.t / dur) * 100 + "%" }} />)}
              {marks.filter((mk) => mk.t <= dur).map((mk) => <i key={mk.id} className="tl-tick mk" style={{ left: (mk.t / dur) * 100 + "%" }} />)}
              <div className="tl-knob" style={{ left: Math.min(100, (time / dur) * 100) + "%" }} />
            </div>
            <span className="tnum text-[13px] w-[44px] opacity-80">{fmt(dur)}</span>
            <button className="btn bar-btn tnum text-[14px]" onClick={() => setRate((r) => ({ 1: 1.25, 1.25: 1.5, 1.5: 2, 2: 1 }[r]))} aria-label="재생 속도">{rate}×</button>
            <button className="btn markbtn" onClick={addMark}><Ic d={I.flag} s={18} /><span className="hide-xs">시험 출제 암시</span></button>
          </div>
          <div className="flex items-center justify-between gap-2 mt-1.5 text-[12px] opacity-85 min-h-[18px]">
            <span aria-live="polite">{flash ? `[${fmt(flash.t)}] 출제 암시로 북마크했어요` : media ? media.name : "음성 없음 · 가상 재생"}</span>
            {!media && <label className="underline cursor-pointer">음성 연결<input type="file" accept="audio/*,video/mp4,.mp3,.m4a,.wav,.mp4" className="sr-only" onChange={(e) => { attach(e.target.files[0]); e.target.value = ""; }} /></label>}
          </div>
        </div>
      </header>
      {media && (
        <video ref={mediaRef} src={media.url} playsInline preload="metadata" className={media.isVideo ? "wrap block w-full max-h-[34vh] bg-black mt-3 rounded-xl" : "hidden"}
          onLoadedMetadata={(e) => { setMediaDur(e.target.duration || 0); e.target.playbackRate = rate; }}
          onTimeUpdate={(e) => setTime(e.target.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onClick={toggle} />
      )}

      <main className="wrap pt-4">
        {(pending || job) && (
          <div className="card p-4 mb-4">
            {job && !job.error ? <>
              <div className="flex items-center justify-between gap-3 mb-2"><b>{job.label}</b><span className="text-[13px] mute">화면을 켜 둔 채로 기다려 주세요</span></div>
              <div className="progress"><div style={{ width: Math.max(4, (job.pct || 0) * 100) + "%" }} /></div>
            </> : <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[220px]">
                <b>{job && job.error ? "처리가 중단됐어요" : "아직 교정·요약 전이에요"}</b>
                <div className="text-[14px] mute">{job && job.error ? job.error : aiReady(cfg) ? "끝난 단계는 저장돼 있어서, 남은 단계부터 이어서 처리해요." : "설정에서 AI 키를 넣으면 교정과 요약을 만들 수 있어요."}</div>
              </div>
              {aiReady(cfg) ? <button className="btn primary" onClick={run}>이어서 처리</button> : <button className="btn primary" onClick={openSettings}>키 입력</button>}
            </div>}
          </div>
        )}

        <div className="mb-4"><Seg value={tab} onChange={setTab} options={tabs} label="보기" /></div>

        {tab === "tx" && (
          <section className="card overflow-hidden">
            <div className="toolbar">
              <input type="search" className="input flex-1 min-w-[180px]" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="전사본 검색" />
              <Seg value={view} onChange={setView} options={[["clean", "교정본"], ["raw", "원문"]]} label="전사 보기" />
              <button className={"btn chipbtn " + (onlyKey ? "on" : "")} aria-pressed={onlyKey} onClick={() => setOnlyKey((v) => !v)}>중요만 {keyCount}</button>
              <label className="check m-0"><input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} /> 따라가기</label>
            </div>
            <div ref={listRef} className="txlist">
              {view === "raw" && <p className="text-[13px] mute px-4 pt-3 m-0">교정 전 음성인식 원문이에요.</p>}
              {visible.length === 0 && <p className="p-8 text-center mute">조건에 맞는 문단이 없어요.</p>}
              {visible.map((s) => {
                const inf = info[s.id], on = s.id === activeIdx;
                const cls = "para" + (on ? " on" : "") + (inf.manual.length ? " mk" : inf.auto ? " hl" : inf.ai ? " ai" : "");
                return (
                  <div key={s.id} ref={(el) => (segRefs.current[s.id] = el)} className={cls} role="button" tabIndex={0} onClick={() => seek(s.t, true)} onKeyDown={(e) => e.key === "Enter" && seek(s.t, true)}>
                    <div className="para-meta">
                      <span className="tnum ts">{fmt(s.t)}</span>
                      {inf.auto && <span className="chip chip-hl">교수님 강조</span>}
                      {inf.ai && !inf.auto && <span className="chip chip-teal">AI 중요</span>}
                      {inf.manual.map((mk) => <span key={mk.id} className="chip chip-rose-solid tnum">출제 암시 {fmt(mk.t)}{mk.note ? " · " + mk.note : ""}</span>)}
                    </div>
                    <p className={"para-text" + (view === "raw" ? " mute" : "")}>{view === "clean" ? renderText(s.text, query.trim(), (g, w) => setTerm({ ...g, w })) : renderText(s.raw || "(원문 없음)", query.trim(), () => {})}</p>
                    {inf.ai && view === "clean" && <p className="para-key">{kl[s.id]}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {tab === "key" && (
          <section>
            {cards.length === 0 ? <p className="card p-5 mute m-0">아직 중요 표시가 없어요. 강의를 들으며 ‘시험 출제 암시’를 누르면 여기에 모여요.</p> : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c) => (
                  <button key={c.key} className={"keycard " + c.kind} onClick={() => jump(c.t)}>
                    <span className="flex items-center gap-2 flex-wrap"><span className="tbadge tnum">{fmt(c.t)}</span><span className={"chip " + (c.kind === "manual" ? "chip-rose-solid" : c.kind === "ai" ? "chip-teal" : "chip-hl")}>{c.tag}</span></span>
                    <span className="text-[16px] font-medium leading-snug">{c.line}</span>
                  </button>
                ))}
              </div>
            )}
            {marks.length > 0 && <>
              <h3 className="text-[15px] font-bold mute mt-8 mb-3">내 마킹 메모</h3>
              <ul className="card divide p-0 m-0 list-none">
                {marks.map((mk) => (
                  <li key={mk.id} className="flex items-center gap-2 px-3 py-2">
                    <TBadge t={mk.t} onJump={jump} />
                    <input className="input flex-1" value={mk.note} placeholder="메모 (예: 국시 단골)" aria-label={`${fmt(mk.t)} 메모`} onChange={(e) => setMarks((ms) => ms.map((x) => (x.id === mk.id ? { ...x, note: e.target.value } : x)))} />
                    <button className="btn ghost" aria-label="마킹 삭제" onClick={() => { setMarks((ms) => ms.filter((x) => x.id !== mk.id)); toast(`[${fmt(mk.t)}] 마킹을 지웠어요`); }}><Ic d={I.x} s={18} /></button>
                  </li>
                ))}
              </ul>
            </>}
          </section>
        )}

        {tab === "sum" && <SummaryView lec={lec} level={level} setLevel={setLevel} jump={jump} />}
      </main>

      {term && (
        <div className="termcard card" role="dialog" aria-label="의학 용어">
          <div className="flex items-start justify-between gap-2">
            <div><div className="text-[18px] font-bold teal">{term.w}</div><div className="text-[15px] font-medium">{term.ko}</div></div>
            <button className="btn ghost" aria-label="닫기" onClick={() => setTerm(null)}><Ic d={I.x} s={18} /></button>
          </div>
          <p className="text-[15px] mt-2 mb-0 mute">{term.d}</p>
        </div>
      )}

      {menu === "menu" && (
        <Sheet title="강의 관리" onClose={() => setMenu(null)}>
          <div className="flex flex-col gap-2">
            <button className="btn soft justify-start" onClick={() => setMenu("rename")}>이름 바꾸기</button>
            <label className="btn soft justify-start cursor-pointer">{media ? "음성 파일 바꾸기" : "음성 파일 연결"}<input type="file" accept="audio/*,video/mp4,.mp3,.m4a,.wav,.mp4" className="sr-only" onChange={(e) => { attach(e.target.files[0]); e.target.value = ""; setMenu(null); }} /></label>
            <button className="btn soft justify-start" disabled={!aiReady(cfg) || !!(job && !job.error)} onClick={async () => { setMenu(null); await save({ ...lec, marks, status: { ...st, summarized: false } }); run(); }}>요약 다시 만들기</button>
            <button className="btn soft justify-start rose" onClick={() => setMenu("delete")}>강의 삭제</button>
          </div>
        </Sheet>
      )}
      {menu === "rename" && <RenameSheet title={lec.title} onClose={() => setMenu(null)} onSave={(t) => { save({ ...lec, marks, title: t, userTitle: true }); setMenu(null); }} />}
      {menu === "delete" && (
        <Sheet title="이 강의를 삭제할까요?" onClose={() => setMenu(null)}>
          <p className="mute mt-0">전사본, 요약, 마킹, 저장된 음성이 모두 지워지고 되돌릴 수 없어요.</p>
          <div className="flex justify-end gap-2 mt-4">
            <button className="btn soft" onClick={() => setMenu(null)}>취소</button>
            <button className="btn danger" onClick={remove}>삭제</button>
          </div>
        </Sheet>
      )}
    </div>
  );
}
function RenameSheet({ title, onClose, onSave }) {
  const [t, setT] = useState(title);
  return (
    <Sheet title="이름 바꾸기" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); t.trim() && onSave(t.trim()); }}>
        <input className="input w-full" value={t} onChange={(e) => setT(e.target.value)} autoFocus />
        <div className="flex justify-end gap-2 mt-4"><button type="button" className="btn soft" onClick={onClose}>취소</button><button className="btn primary" disabled={!t.trim()}>저장</button></div>
      </form>
    </Sheet>
  );
}

function SummaryView({ lec, level, setLevel, jump }) {
  const [closed, setClosed] = useState(() => new Set());
  const empty = !lec.outline.length && !lec.concepts.length && !lec.mechs.length;
  if (empty) return <p className="card p-5 mute m-0">요약이 아직 없어요. 교정·요약 처리가 끝나면 여기에 나타나요.</p>;
  const list = level === 2 ? lec.concepts : lec.mechs;
  const toggle = (k) => setClosed((c) => { const n = new Set(c); n.has(k) ? n.delete(k) : n.add(k); return n; });
  return (
    <section>
      <div className="mb-4"><Seg value={level} onChange={setLevel} label="요약 단계" options={[[1, "① 강의 뼈대"], [2, "② 핵심 개념"], [3, "③ 상세 기전"]]} /></div>
      {level === 1 ? (
        <ol className="card divide p-0 m-0 list-none">
          {lec.outline.map((o, i) => (
            <li key={i} className="flex gap-4 p-4 items-start">
              <span className="text-[22px] font-bold tnum w-7 shrink-0 leading-none pt-0.5 teal">{i + 1}</span>
              <div className="flex-1"><div className="text-[17px] font-bold">{o.title}</div><div className="text-[15px] mute">{o.sub}</div></div>
              <TBadge t={o.t} onJump={jump} />
            </li>
          ))}
        </ol>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map((c, i) => {
            const k = level + "-" + i, open = !closed.has(k);
            return (
              <div key={k} className="card overflow-hidden">
                <button className="w-full flex items-center gap-3 p-4 text-left min-h-[56px]" aria-expanded={open} onClick={() => toggle(k)}>
                  <span className="flex-1 text-[17px] font-bold">{c.title}</span>
                  <span className="mute" style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform .2s" }}><Ic d={I.right} s={18} /></span>
                </button>
                {open && (
                  <div className="px-4 pb-4">
                    {c.rows ? (
                      <dl className="kv">{c.rows.map(([a, b], j) => <React.Fragment key={j}><dt>{a}</dt><dd>{b}</dd></React.Fragment>)}</dl>
                    ) : (
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="box act"><div className="box-h teal">강의에서</div><p className="m-0 text-[15px]">{c.lecture}</p></div>
                        {c.extra && <div className="box"><div className="box-h mute">보충 기전 · 강의 외 교과서 내용</div><p className="m-0 text-[15px]">{c.extra}</p></div>}
                      </div>
                    )}
                    {c.refs.length > 0 && <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[13px] mute">근거 {c.refs.map((t) => <TBadge key={t} t={t} onJump={jump} />)}</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <p className="text-[13px] mute mt-5">{lec.sample ? "샘플 강의용으로 미리 작성된 요약이에요." : "전사본만 근거로 AI가 만든 요약이에요. 수치와 기준은 시간 표시를 눌러 원문과 대조하세요."}</p>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => {});
