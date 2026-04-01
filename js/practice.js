const params = new URLSearchParams(location.search);
const id = params.get("id");
const ch = (typeof CHALLENGES !== "undefined") ? CHALLENGES.find(x => x.id === id) : null;

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

const PRAISE_OK = ["אלופה! 💪", "מעולה!! 🚀", "איזה תותח/ית 😎", "וואו, זה מדויק! 🎯", "יש! המשך/י ככה ⭐"];
const PRAISE_TRY = ["כמעט! 🔁 נסה/י שוב", "עוד רגע את/ה שם 😉", "לא נורא—עוד ניסיון אחד 💡", "ממש קרוב! תבדוק/י שוב"];

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

function getNextChallengeId(currentId){
  const idx = CHALLENGES.findIndex(x => x.id === currentId);
  if (idx === -1) return null;
  return CHALLENGES[idx + 1]?.id ?? null;
}

function goNext(){
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

if (!ch) {
  document.body.innerHTML = "<h2 style='padding:20px'>לא נמצא תרגול 😅</h2>";
} else {
  // ✅ theme
  document.body.dataset.group = ch.group ?? "";

  document.title = ch.title;

  document.getElementById("title").textContent = ch.title ?? "";
  document.getElementById("subtitle").textContent = ch.subtitle ?? "";
  document.getElementById("explain").textContent = ch.explain ?? "";
  document.getElementById("task").textContent = ch.task ?? "";

  const hintEl = document.getElementById("hint");
  hintEl.textContent = ch.hint ?? "";
  // document.getElementById("hintBtn").onclick = () => hintEl.classList.toggle("hidden");

  const topicBadge = document.getElementById("topicBadge");
  const progressBadge = document.getElementById("progressBadge");
  topicBadge.textContent = `# ${ch.topic ?? ""}`;
  const idx = CHALLENGES.findIndex(x => x.id === ch.id);
  progressBadge.textContent = `אתגר ${idx + 1} מתוך ${CHALLENGES.length}`;

  // ✅ progress dots
  renderProgressDots(idx, CHALLENGES.length);

  const area = document.getElementById("practiceArea");
  area.innerHTML = "";

  if (!ch.fallback) {
    area.innerHTML = "<p class='mini'>אין תרגול לאתגר הזה.</p>";
  } else if (ch.fallback.type === "quiz") {
    renderQuiz(ch.fallback, area);
  } else if (ch.fallback.type === "order") {
    renderOrder(ch.fallback, area);
  } else if (ch.fallback.type === "fill") {
    renderFill(ch.fallback, area);
  } else {
    area.innerHTML = "<p class='mini'>סוג תרגול לא מוכר.</p>";
  }

  document.getElementById("nextBtn").onclick = goNext;
}

/* ---------- renderQuiz / renderOrder / renderFill ---------- */

function renderQuiz(fb, root){
  const box = document.createElement("div");
  box.className = "text";
  box.innerHTML = `<p><b>${fb.question}</b></p>`;

  const list = document.createElement("div");
  list.className = "grid";

  fb.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.textContent = opt;

    btn.onclick = () => {
      const ok = idx === fb.correctIndex;
      root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());

      const msg = document.createElement("div");
      msg.className = ok ? "status good" : "status bad";
      msg.textContent = ok ? ("✅ " + pick(PRAISE_OK)) : ("❌ " + pick(PRAISE_TRY));

      const exp = document.createElement("p");
      exp.className = "mini answer";
      exp.textContent = ok ? (fb.explainCorrect ?? "מעולה!"):"";

      root.appendChild(msg);
      root.appendChild(exp);
    };

    list.appendChild(btn);
  });

  root.appendChild(box);
  root.appendChild(list);
}

function renderOrder(fb, root){
  const p = document.createElement("p");
  p.className = "text";
  p.innerHTML = `<b>${fb.prompt}</b>`;
  root.appendChild(p);

  const wrap = document.createElement("div");
  wrap.className = "orderWrap";

  const pieces = [...fb.pieces].sort(() => Math.random() - 0.5);

  pieces.forEach((line) => {
    const row = document.createElement("div");
    row.className = "orderItem";
    row.draggable = true;
    row.dataset.value = line;

    row.innerHTML = `
      <div class="orderGrip">≡</div>
      <div class="orderCode">${escapeHtml(line)}</div>
    `;

    row.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", line);
    });

    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      row.classList.add("dragOver");
    });

    row.addEventListener("dragleave", () => row.classList.remove("dragOver"));

    row.addEventListener("drop", (e) => {
      e.preventDefault();
      row.classList.remove("dragOver");

      const draggedValue = e.dataTransfer.getData("text/plain");
      const draggedEl = [...wrap.children].find(x => x.dataset.value === draggedValue);
      if (!draggedEl || draggedEl === row) return;

      wrap.insertBefore(draggedEl, row);
    });

    wrap.appendChild(row);
  });

  root.appendChild(wrap);

  const actions = document.createElement("div");
  actions.className = "orderActions";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn";
  checkBtn.textContent = "בדוק סדר ✅";

  checkBtn.onclick = () => {
    root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());

    const current = [...wrap.children].map(el => el.dataset.value);
    const ok = current.join("\n") === fb.correct.join("\n");

    const result = document.createElement("div");
    result.className = ok ? "status good" : "status bad";
    result.textContent = ok ? ("✅ " + pick(PRAISE_OK)) : ("❌ " + pick(PRAISE_TRY));

    const exp = document.createElement("p");
    exp.className = "mini answer";
    exp.textContent = ok ? (fb.explainCorrect ?? "מעולה!") : "";

    root.appendChild(result);
    root.appendChild(exp);
  };

  actions.appendChild(checkBtn);
  root.appendChild(actions);
}

function escapeHtml(s){
  return (s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function renderFill(fb, root){
  const wrap = document.createElement("div");
  wrap.style.display = "grid";
  wrap.style.gap = "12px";

  const sentence = document.createElement("div");
  sentence.className = "hint";
  sentence.style.direction = "ltr";
  sentence.style.textAlign = "left";

  const blanks = fb.blanks.map(() => ({ value: "" }));

  function renderSentence(){
    sentence.innerHTML = "";

    const line = document.createElement("div");
    line.style.display = "flex";
    line.style.flexWrap = "wrap";
    line.style.gap = "10px";
    line.style.alignItems = "center";

    fb.promptParts.forEach((part, i) => {
      const t = document.createElement("span");
      t.style.fontFamily = "ui-monospace, Menlo, Consolas, monospace";
      t.textContent = part;
      line.appendChild(t);

      if (i < fb.blanks.length) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "btn btnGhost";
        b.style.fontFamily = "ui-monospace, Menlo, Consolas, monospace";
        b.style.direction = "ltr";
        b.style.textAlign = "left";
        b.textContent = blanks[i].value || "____";

        b.onclick = () => {
          blanks[i].value = "";
          renderSentence();
        };

        line.appendChild(b);
      }
    });

    sentence.appendChild(line);
  }

  const bankTitle = document.createElement("p");
  bankTitle.className = "text";
  bankTitle.innerHTML = "<b>בחרו מילים כדי להשלים:</b>";

  const bankBox = document.createElement("div");
  bankBox.className = "grid";

  fb.bank.forEach(word => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile";
    btn.style.fontFamily = "ui-monospace, Menlo, Consolas, monospace";
    btn.style.direction = "ltr";
    btn.style.textAlign = "left";
    btn.textContent = word;

    btn.onclick = () => {
      const idx = blanks.findIndex(b => !b.value);
      if (idx === -1) return;
      blanks[idx].value = word;
      renderSentence();
    };

    bankBox.appendChild(btn);
  });

  const actions = document.createElement("div");
  actions.className = "row";
  actions.style.justifyContent = "flex-end";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn";
  checkBtn.textContent = "בדוק ✅";

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btnGhost";
  resetBtn.textContent = "אפס";

  checkBtn.onclick = () => {
    root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());

    const ok = fb.blanks.every((b, i) =>
      (blanks[i].value || "").trim() === (b.correct || "").trim()
    );

    const result = document.createElement("div");
    result.className = ok ? "status good" : "status bad";
    result.textContent = ok ? ("✅ " + pick(PRAISE_OK)) : ("❌ " + pick(PRAISE_TRY));

    const exp = document.createElement("p");
    exp.className = "mini answer";
    exp.textContent = ok ? (fb.explainCorrect ?? "מעולה!") : "";

    root.appendChild(result);
    root.appendChild(exp);
  };

  resetBtn.onclick = () => {
    blanks.forEach(b => b.value = "");
    renderSentence();
    root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());
  };

  actions.appendChild(checkBtn);
  actions.appendChild(resetBtn);

  wrap.appendChild(sentence);
  wrap.appendChild(bankTitle);
  wrap.appendChild(bankBox);
  wrap.appendChild(actions);
  root.appendChild(wrap);

  renderSentence();
}
