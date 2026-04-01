function groupMeta(group) {
  const map = {
    basics: { title: "תרגול יסודות", sub: "לפני שמתחילים את הפרויקטים לפי שנה אתם רוצים לעשות כמה תרגולים בתכנות לראות שיש לנו בסיס חזק!" },

    projects_y1: { title: "תרגול פרויקטים – שנה א׳", sub: "תלמידי שנה א' זה המקום בשבילכם מחכים לכם פה מלא משימות בונוס מגניבות לתרגול" },
    projects_y2: { title: "תרגול פרויקטים – שנה ב׳", sub: "תלמידי שנה ב' הפרויקטים מקבלים שדרוגים מגניבים והאתגרים עולים רמה" },
    projects_y3: { title: "תרגול פרויקטים – שנה ג׳", sub: "תלמידי שנה ג' פה תמצאו בונוסים שלא למדנו בשיעור, הרחבות על הנושאים שלמדנו ואתגרים מדהימים" },

    mini_projects: { title: "פרויקטים עצמאיים", sub: "פרויקטים שלא קיימים בחוג שאתם מתכנתים בעצמכם! עם העזרה שלנו" },
  };

  return map[group] ?? { title: "תרגול", sub: "" };
}

function makeTile(ch, groupFromPage) {
  const a = document.createElement("a");
  a.className = "tile";

  const page = (ch.mode === "practiceOnly") ? "practice.html" : "challenge.html";
  const g = ch.group ?? groupFromPage ?? "";
  const groupPart = g ? `&group=${encodeURIComponent(g)}` : "";

  a.href = `./${page}?id=${encodeURIComponent(ch.id)}${groupPart}`;

  a.innerHTML = `
    <div class="tag"># ${ch.topic ?? ""}</div>
    <div class="name">${ch.title ?? ""}</div>
    <div class="desc">${ch.subtitle ?? ""}</div>
  `;
  return a;
}

(function main() {
  if (typeof CHALLENGES === "undefined" || !Array.isArray(CHALLENGES)) {
    document.body.innerHTML = "<h2 style='padding:20px'>לא נטענו נתוני תרגילים 😅</h2>";
    return;
  }

  const params = new URLSearchParams(location.search);
  const group = params.get("group") || "basics";
  document.body.dataset.group = group;

  const meta = groupMeta(group);
  document.title = meta.title;

  const title = document.getElementById("catTitle");
  const sub = document.getElementById("catSub");
  const list = document.getElementById("list");

  if (title) title.textContent = meta.title;

  const items = CHALLENGES.filter(ch => (ch.group ?? "") === group);

  if (sub) {
    sub.textContent = `${meta.sub}${items.length ? ` • ${items.length} תרגילים` : ""}`;
  }

  if (!items.length) {
    list.innerHTML = "<p class='mini'>אין תרגילים בקטגוריה הזו עדיין.</p>";
    return;
  }

  items.forEach(ch => list.appendChild(makeTile(ch, group)));
})();
