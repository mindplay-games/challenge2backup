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
      showFeedback(root, ok, fb.explainCorrect ?? "מעולה!", ok ? "" : "רמז: חזרו להסבר ונסו שוב 😉");
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
  if (fb.type === "order") return renderOrder(fb, root);
  if (fb.type === "fill") return renderFill(fb, root);

  root.innerHTML = "<p class='mini'>סוג תרגול לא מוכר.</p>";
}
