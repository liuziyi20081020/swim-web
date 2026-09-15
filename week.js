function updateWeekRecords() {
  const records = JSON.parse(localStorage.getItem("swimRecords")) || [];
  const weekRecordsList = document.getElementById("weekRecordsList");

  if (!weekRecordsList) return;

  weekRecordsList.innerHTML = "";

  if (records.length === 0) {
    weekRecordsList.innerHTML = `<p class="no-data">目前尚無訓練紀錄</p>`;
    return;
  }

  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const recentRecords = records.filter(function (r) {
    if (!r.date) return false;
    const recordDate = new Date(r.date);
    return recordDate >= sevenDaysAgo && recordDate <= now;
  });

  if (recentRecords.length === 0) {
    weekRecordsList.innerHTML = `<p class="no-data">近 7 天內沒有訓練紀錄</p>`;
    return;
  }

  recentRecords.reverse().forEach(function (r) {
    const card = document.createElement("div");
    card.className = "week-card";

    const notesHTML = r.notes ? `<p class="week-notes">備註：${r.notes}</p>` : "";

    card.innerHTML = `
      <div class="week-card-header">
        <span class="week-date">${r.date || "未填寫日期"}</span>
        <span class="week-total-dis">${r.totalDis || 0} 公尺</span>
      </div>
      <div class="week-card-body">
        <p>蝶: ${r.butterfly || 0}m | 仰: ${r.backstroke || 0}m | 蛙: ${r.breaststroke || 0}m | 自: ${r.freestyle || 0}m</p>
        <p>時間：${r.durationM || 0} 分 ${r.durations || r.durationS || 0} 秒</p>
        ${notesHTML}
      </div>
    `;

    weekRecordsList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateWeekRecords();
});
