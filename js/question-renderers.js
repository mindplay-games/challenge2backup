function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

const PRAISE_OK = ["אלופה! 💪", "מעולה!! 🚀", "איזה תותח/ית 😎", "וואו, זה מדויק! 🎯", "יש! המשך/י ככה ⭐"];
const PRAISE_TRY = ["כמעט! 🔁 נסה/י שוב", "עוד רגע את/ה שם 😉", "לא נורא—עוד ניסיון אחד 💡", "ממש קרוב! תבדוק/י שוב"];

function escapeHtml(s){
  return (s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function clearFeedback(root){
  root.querySelectorAll(".status, .mini.answer").forEach(el => el.remove());
}

function showFeedback(root, ok, explainCorrect = "", explainWrong = ""){
  clearFeedback(root);

  const msg = document.createElement("div");
  msg.className = ok ? "status good" : "status bad";
  msg.textContent = ok ? ("✅ " + pick(PRAISE_OK)) : ("❌ " + pick(PRAISE_TRY));

  const exp = document.createElement("p");
  exp.className = "mini answer";
  exp.textContent = ok ? (explainCorrect ?? "מעולה!") : (explainWrong ?? "");

  root.appendChild(msg);
  root.appendChild(exp);
}

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
      showFeedback(
        root,
        ok,
        fb.explainCorrect ?? "מעולה!",
        ok ? "" : "רמז: חזרו להסבר ונסו שוב 😉"
      );
    };

    list.appendChild(btn);
  });

  root.appendChild(box);
  root.appendChild(list);
}

function renderTrueFalse(fb, root){
  const box = document.createElement("div");
  box.className = "text";
  box.innerHTML = `<p><b>${fb.question}</b></p>`;

  const list = document.createElement("div");
  list.className = "grid";

  const options = [
    { label: "נכון", value: true },
    { label: "לא נכון", value: false }
  ];

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.textContent = opt.label;

    btn.onclick = () => {
      const ok = opt.value === fb.correct;
      showFeedback(
        root,
        ok,
        fb.explainCorrect ?? "מעולה!",
        "רמז: נסו לחשוב אם המשפט באמת נכון או לא נכון 😉"
      );
    };

    list.appendChild(btn);
  });

  root.appendChild(box);
  root.appendChild(list);
}

function renderMultiSelect(fb, root){
  const box = document.createElement("div");
  box.className = "text";
  box.innerHTML = `<p><b>${fb.question}</b></p>`;

  const list = document.createElement("div");
  list.className = "grid";

  const selected = new Set();

  fb.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.textContent = opt;

    btn.onclick = () => {
      if (selected.has(idx)) {
        selected.delete(idx);
        btn.classList.remove("selected");
      } else {
        selected.add(idx);
        btn.classList.add("selected");
      }
    };

    list.appendChild(btn);
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
    const correct = [...(fb.correctIndexes ?? [])].sort((a, b) => a - b);
    const current = [...selected].sort((a, b) => a - b);

    const ok =
      correct.length === current.length &&
      correct.every((val, i) => val === current[i]);

    showFeedback(
      root,
      ok,
      fb.explainCorrect ?? "מעולה!",
      "רמז: יכול להיות שיש יותר מתשובה אחת נכונה 😉"
    );
  };

  resetBtn.onclick = () => {
    selected.clear();
    list.querySelectorAll(".tile").forEach(btn => btn.classList.remove("selected"));
    clearFeedback(root);
  };

  actions.appendChild(checkBtn);
  actions.appendChild(resetBtn);

  root.appendChild(box);
  root.appendChild(list);
  root.appendChild(actions);
}

function renderPredictOutput(fb, root){
  const box = document.createElement("div");
  box.className = "text";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<b>${fb.question ?? "מה יודפס?"}</b>`;
  box.appendChild(prompt);

  const code = document.createElement("pre");
  code.className = "solution";
  code.style.display = "block";
  code.style.direction = "ltr";
  code.style.textAlign = "left";
  code.textContent = fb.code ?? "";
  box.appendChild(code);

  const list = document.createElement("div");
  list.className = "grid";

  fb.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "tile";
    btn.type = "button";
    btn.textContent = opt;

    btn.onclick = () => {
      const ok = idx === fb.correctIndex;
      showFeedback(
        root,
        ok,
        fb.explainCorrect ?? "מעולה!",
        "רמז: נסו לעבור שורה שורה ולחשוב מה יודפס בפועל 😉"
      );
    };

    list.appendChild(btn);
  });

  root.appendChild(box);
  root.appendChild(list);
}


function normalizeCode(s){
  return (s ?? "")
    .trim()
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "");
}

function renderDebug(fb, root){

  const box = document.createElement("div");
  box.className = "text";

  const prompt = document.createElement("p");
  prompt.innerHTML = `<b>${fb.question ?? "תקנו את הקוד:"}</b>`;
  box.appendChild(prompt);

  const editor = document.createElement("textarea");
  editor.className = "editor";
  editor.spellcheck = false;
  editor.value = fb.starterCode ?? "";

  const actions = document.createElement("div");
  actions.className = "row";
  actions.style.justifyContent = "flex-end";

  const checkBtn = document.createElement("button");
  checkBtn.className = "btn";
  checkBtn.textContent = "בדוק תיקון ✅";

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btnGhost";
  resetBtn.textContent = "אפס";

  checkBtn.onclick = () => {

    const user = normalizeCode(editor.value);
    const solution = normalizeCode(fb.solution ?? "");

    const ok = user === solution;

    showFeedback(
      root,
      ok,
      fb.explainCorrect ?? "מעולה! תיקנת נכון את הקוד 🎯",
      "בדקו שוב סוגריים, גרשיים, נקודתיים והזחה 😉"
    );
  };

  resetBtn.onclick = () => {
    editor.value = fb.starterCode ?? "";
    clearFeedback(root);
  };

  actions.appendChild(checkBtn);
  actions.appendChild(resetBtn);

  root.appendChild(box);
  root.appendChild(editor);
  root.appendChild(actions);
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
    const current = [...wrap.children].map(el => el.dataset.value);
    const ok = current.join("\n") === fb.correct.join("\n");

    showFeedback(
      root,
      ok,
      fb.explainCorrect ?? "מעולה!",
      "רמז: נסו לחשוב על הסדר הנכון 😉"
    );
  };

  actions.appendChild(checkBtn);
  root.appendChild(actions);
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
    const ok = fb.blanks.every((b, i) =>
      (blanks[i].value || "").trim() === (b.correct || "").trim()
    );

    showFeedback(
      root,
      ok,
      fb.explainCorrect ?? "מעולה!",
      ""
    );
  };

  resetBtn.onclick = () => {
    blanks.forEach(b => b.value = "");
    renderSentence();
    clearFeedback(root);
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

function renderQuestionByType(fb, root){

  if (!fb || !fb.type) {
    root.innerHTML = "<p class='mini'>סוג תרגול לא מוכר.</p>";
    return;
  }

  if (fb.type === "quiz") return renderQuiz(fb, root);

  if (fb.type === "trueFalse") return renderTrueFalse(fb, root);

  if (fb.type === "multiSelect") return renderMultiSelect(fb, root);

  if (fb.type === "predictOutput") return renderPredictOutput(fb, root);

  if (fb.type === "debug") return renderDebug(fb, root);

  if (fb.type === "order") return renderOrder(fb, root);

  if (fb.type === "fill") return renderFill(fb, root);

  root.innerHTML = "<p class='mini'>סוג תרגול לא מוכר.</p>";
}
