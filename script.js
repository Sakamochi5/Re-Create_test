(() => {
  const data = window.SITE_CONTENT || {};
  document.querySelectorAll("[data-site-name]").forEach(el => el.textContent = data.name || "Code Circle");
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll("[data-social]").forEach(link => {
    const url = data[link.dataset.social];
    if (url) link.href = url;
    else { link.removeAttribute("href"); link.classList.add("is-unset"); link.setAttribute("aria-label", `${link.dataset.social === "x" ? "X" : "Instagram"}リンクは準備中です`); }
  });
  const scheduleList = document.getElementById("schedule-list");
  (data.schedule || []).forEach(item => {
    const entry = document.createElement("li");
    const period = document.createElement("span"); period.className = "timeline-period"; period.textContent = item.period || "";
    const title = document.createElement("h3"); title.textContent = item.title || "活動";
    const description = document.createElement("p"); description.textContent = item.description || "";
    entry.append(period, title, description); scheduleList.append(entry);
  });
  const activityList = document.getElementById("activity-list");
  (data.activities || []).forEach((item, index) => {
    const card = document.createElement("article"); card.className = `activity-card ${item.color || "mint"}`;
    card.innerHTML = `<div class="activity-top"><span>${item.category || "ACTIVITY"}</span><span>${item.date || ""}</span></div><div class="activity-illustration"><span class="activity-glyph">${item.icon || "✳"}</span><span class="activity-index">0${index + 1}</span></div><h3></h3><p></p>`;
    card.querySelector("h3").textContent = item.title || "活動タイトル"; card.querySelector("p").textContent = item.description || "活動の内容を紹介します。"; activityList.append(card);
  });
  if (!data.activities?.length) activityList.innerHTML = '<p class="empty-state">活動の記録を準備中です。</p>';
  const pressList = document.getElementById("press-list");
  (data.press || []).forEach(item => {
    const row = document.createElement(item.url ? "a" : "div"); row.className = "press-row";
    if (item.url) { row.href = item.url; row.target = "_blank"; row.rel = "noopener noreferrer"; }
    const date = document.createElement("span"); date.className = "press-date"; date.textContent = item.date || "";
    const publisher = document.createElement("span"); publisher.className = "press-publisher"; publisher.textContent = item.publisher || "";
    const title = document.createElement("b"); title.textContent = item.title || "記事タイトル";
    const arrow = document.createElement("span"); arrow.className = "press-arrow"; arrow.textContent = "↗";
    row.append(date, publisher, title, arrow); pressList.append(row);
  });
  if (!data.press?.length) pressList.innerHTML = '<p class="empty-state">掲載記事は準備中です。</p>';
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".site-nav");
  toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("is-open", !open); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }));
})();
