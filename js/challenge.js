function sfxPlay(id){
  const el = document.getElementById(id);
  if (!el) return;

  try{
    el.currentTime = 0;
    const p = el.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }catch{}
}

const PRAISE_ERR = ["יש שגיאה קטנה—נתקן ונמשיך 🛠️", "לא נורא! בוא/י נבדוק איפה זה נשבר 🙂"];

function renderProgressDots(currentIndex, total){
  const el = document.getElementById("progressDots");
  if (!el) return;

  el.innerHTML = "";
  const maxDots = 10;

  if (total <= maxDots){
    for (let i = 0; i < total; i++){
      const d = document.createElement("span");
      d.className = "dot" + (i < currentIndex ? " done" : "") + (i === currentIndex ? " current" : "");
      el.appendChild(d);
    }
    return;
  }

  const windowSize = 10;
  const start = Math.max(0, Math.min(total - windowSize, currentIndex - Math.floor(windowSize/2)));

  for (let i = start; i < start + windowSize; i++){
    const d = document.createElement("span");
    d.className = "dot" + (i < currentIndex ? " done" : "") + (i === currentIndex ? " current" : "");
    el.appendChild(d);
  }
}

function main() {
  if (typeof CHALLENGES === "undefined" || !Array.isArray(CHALLENGES)) {
    document.body.innerHTML = "<h2 style='padding:20px'>לא נטענו נתוני אתגרים 😅</h2>";
    return;
  }

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const ch = CHALLENGES.find(x => x.id === id);

  function getNextChallengeId(currentId) {
    const idx = CHALLENGES.findIndex(x => x.id === currentId);
    if (idx === -1) return null;
    return CHALLENGES[idx + 1]?.id ?? null;
  }

  function goNextChallenge() {
    const nextId = getNextChallengeId(id);

    if (!nextId) {
      alert("🎉 סיימתם את כל האתגרים!");
      location.href = "./index.html";
      return;
    }

    const nextCh = CHALLENGES.find(x => x.id === nextId);
    const page = (nextCh?.mode === "practiceOnly") ? "practice.html" : "challenge.html";
    location.href = `./${page}?id=${encodeURIComponent(nextId)}`;
  }

  if (!id) {
    document.body.innerHTML = "<h2 style='padding:20px'>חסר id בכתובת 😅</h2>";
    return;
  }

  if (!ch) {
    document.body.innerHTML = "<h2 style='padding:20px'>לא נמצא אתגר 😅</h2>";
    return;
  }

  document.body.dataset.group = ch.group ?? "";
  document.title = ch.title;

  const title = document.getElementById("title");
  const subtitle = document.getElementById("subtitle");
  const explain = document.getElementById("explain");
  const task = document.getElementById("task");
  const hint = document.getElementById("hint");
  const solution = document.getElementById("solution");

  const editor = document.getElementById("editor");
  const output = document.getElementById("output");
  const status = document.getElementById("status");
  const codeCard = document.getElementById("codeCard");

  const topicBadge = document.getElementById("topicBadge");
  const progressBadge = document.getElementById("progressBadge");

  if (title) title.textContent = ch.title ?? "";
  if (subtitle) subtitle.textContent = ch.subtitle ?? "";
  if (explain) explain.textContent = ch.explain ?? "";
  if (task) task.textContent = ch.task ?? "";
  if (hint) hint.textContent = ch.hint ?? "";
  if (solution) solution.textContent = ch.solution ?? "";

  if (topicBadge) topicBadge.textContent = `# ${ch.topic ?? ""}`;
  const idx = CHALLENGES.findIndex(x => x.id === ch.id);
  if (progressBadge) progressBadge.textContent = `אתגר ${idx + 1} מתוך ${CHALLENGES.length}`;

  renderProgressDots(idx, CHALLENGES.length);

  const key = "code_" + ch.id;
  if (editor) {
    editor.value = localStorage.getItem(key) ?? (ch.starter ?? "");
    editor.addEventListener("input", () => localStorage.setItem(key, editor.value));
  }

  const hintBtn = document.getElementById("hintBtn");
  const solutionBtn = document.getElementById("solutionBtn");
  const resetBtn = document.getElementById("resetBtn");
  const runBtn = document.getElementById("runBtn");
  const nextBtn = document.getElementById("nextBtn");
  const nextBtnFallback = document.getElementById("nextBtnFallback");

  if (hintBtn && hint) hintBtn.onclick = () => hint.classList.toggle("hidden");
  if (solutionBtn && solution) solutionBtn.onclick = () => solution.classList.toggle("hidden");

  if (resetBtn) {
    resetBtn.onclick = () => {
      if (editor) {
        editor.value = ch.starter ?? "";
        localStorage.setItem(key, editor.value);
      }
      if (output) output.textContent = "";
      if (status) {
        status.textContent = "";
        status.className = "status";
      }
    };
  }

  if (nextBtn) nextBtn.onclick = goNextChallenge;
  if (nextBtnFallback) nextBtnFallback.onclick = goNextChallenge;

  if (ch.mode === "fallbackOnly") {
    codeCard?.classList.add("hidden");
    showFallback(ch);
    return;
  }

  if (runBtn && editor) {
    runBtn.onclick = async () => {
      if (status) {
        sfxPlay("sfxRun");
        status.textContent = "טוען/מריץ…";
        status.className = "status";
      }

      try {
        const res = await runUserCode(editor.value);
        if (output) output.textContent = res.output;

        const check = checkExpected(res.output, ch.expectedOutput);

        if (!res.ok) {
          if (status) {
            sfxPlay("sfxError");
            status.textContent = "❌ " + PRAISE_ERR[Math.floor(Math.random() * PRAISE_ERR.length)];
            status.className = "status bad";
          }
          return;
        }

        if (!check.canCheck) {
          if (status) {
            sfxPlay("sfxSuccess");
            status.textContent = "✅ רץ! אפשר להמשיך";
            status.className = "status good";
          }
          return;
        }

        if (check.passed) sfxPlay("sfxSuccess");
        else sfxPlay("sfxError");

        if (status) {
          status.textContent = check.passed ? "✅ הצלחת!" : "❌ נסה/י שוב";
          status.className = check.passed ? "status good" : "status bad";
        }
      } catch {
        codeCard?.classList.add("hidden");
        showFallback(ch);
      }
    };
  }

  (async () => {
    if (status) {
      status.textContent = "טוען מנוע Python…";
      status.className = "status";
    }
    try {
      await Promise.race([
        initPyodide(),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 12000))
      ]);
      if (status) {
        status.textContent = "✅ Python מוכן! אפשר להריץ";
        status.className = "status good";
      }
    } catch {
      sfxPlay("sfxError");
      codeCard?.classList.add("hidden");
      showFallback(ch);
    }
  })();

  let __stepIndex = 0;

  function showFallback(ch){
    const card = document.getElementById("fallbackCard");
    const area = document.getElementById("fallbackArea");
    card.classList.remove("hidden");
    area.innerHTML = "";

    if (!ch.fallback) {
      area.innerHTML = "<p class='mini'>אין תרגול חלופי לאתגר הזה.</p>";
      return;
    }

    if (ch.fallback.type === "steps") {
      __stepIndex = 0;
      renderStep(ch);
      return;
    }

    renderQuestionByType(ch.fallback, area);
  }

  function renderStep(ch){
    const area = document.getElementById("fallbackArea");
    const steps = ch.fallback.steps;
    const step = steps[__stepIndex];

    area.innerHTML = "";

    const header = document.createElement("div");
    header.className = "row";
    header.style.justifyContent = "space-between";
    header.innerHTML = `
      <span class="badge">${step.title ?? "משימה"}</span>
      <span class="badge">משימה ${__stepIndex + 1} מתוך ${steps.length}</span>
    `;
    area.appendChild(header);

    renderQuestionByType(step, area);

    const nav = document.createElement("div");
    nav.className = "row";
    nav.style.justifyContent = "flex-end";

    const btn = document.createElement("button");
    btn.className = "btn btnGreen";
    const isLast = __stepIndex === steps.length - 1;
    btn.textContent = isLast ? "סיימתי ➜ אתגר הבא" : "הבא ➜";

    btn.onclick = () => {
      if (isLast) {
        goNextChallenge();
        return;
      }
      __stepIndex++;
      renderStep(ch);
    };

    nav.appendChild(btn);
    area.appendChild(nav);
  }
}

main();
