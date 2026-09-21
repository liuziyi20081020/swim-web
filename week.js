



function updateWeekRecords() {
  const records = JSON.parse(localStorage.getItem("swimRecords")) || [];
  const weekRecordsList = document.getElementById("weekRecordsList");

  if (!weekRecordsList) {
    return;
  }
  weekRecordsList.innerHTML = "";

  if (records.length === 0) {
    weekRecordsList.innerHTML = '<p class="no-data">目前尚無訓練紀錄</p>';
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const recentRecords = records.filter(function (r) {
    if (!r.date) return false;

    const parts = r.date.split("-");
    if (parts.length !== 3) return false;

    const recordDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    recordDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - recordDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    return diffDays >= -10 && diffDays <= 14;
  });

  if (recentRecords.length === 0) {
    weekRecordsList.innerHTML = '<p class="no-data">近 7 天內沒有訓練紀錄</p>';
    return;
  }

  recentRecords.reverse().forEach(function (r) {
    const card = document.createElement("div");
    card.className = "week-card";

    const calculatedTotal = (Number(r.butterfly) || 0) + 
                            (Number(r.backstroke) || 0) + 
                            (Number(r.breaststroke) || 0) + 
                            (Number(r.freestyle) || 0);
    const displayDis = r.totalDis !== undefined ? r.totalDis : calculatedTotal;

    const notesHTML = r.notes ? `<p class="week-notes">備註: ${r.notes}</p>` : "";

    card.innerHTML = `
      <div class="week-card-header">
        <span class="week-date">${r.date || "未填寫日期"}</span>
        <span class="week-total-dis">${displayDis} 公尺</span>
      </div>
      <div class="week-card-body">
        <p>蝶: ${r.butterfly || 0}m | 仰: ${r.backstroke || 0}m | 蛙: ${r.breaststroke || 0}m | 自由: ${r.freestyle || 0}m</p>
        <p>時間: ${r.durationM || 0} 分 ${r.durationS || r.durations || 0} 秒</p>
        ${notesHTML}
      </div>
    `;

    weekRecordsList.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateWeekRecords();
});
