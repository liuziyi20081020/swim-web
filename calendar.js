let currentNavDate = new Date();

function renderCalendar() {
    const records = JSON.parse(localStorage.getItem("swimRecords")) || [];
    const monthYear = document.getElementById("calendarMonthYear");
    const days = document.getElementById("calendarDays");

    if (!days || !monthYear) {
        return;
    }

    const year = currentNavDate.getFullYear();
    const month = currentNavDate.getMonth();

    monthYear.textContent = `${year} 年 ${month + 1} 月`;
    days.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "day empty";
        days.appendChild(emptyDiv);
    }

    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        const mStr = String(month + 1).padStart(2, "0");
        const dStr = String(day).padStart(2, "0");
        const formattedDate = `${year}-${mStr}-${dStr}`;

        dayDiv.innerHTML = `<span class="day-num">${day}</span>`;

        const dayRecords = records.filter(function (r) {
        return r.date === formattedDate;
        });

        if (dayRecords.length > 0) {
        dayDiv.classList.add("has-record");
        const totalDis = dayRecords.reduce(function (sum, r) {
            return sum + (Number(r.totalDis) || 0);
        }, 0);
        dayDiv.innerHTML += `<span class="badge">${totalDis}m</span>`;

        dayDiv.addEventListener("click", function () {
            showDayDetail(formattedDate, dayRecords);
        });
        }

        days.appendChild(dayDiv);
    }
    }

    function showDayDetail(dateStr, records) {
        const modal = document.getElementById("dayDetailModal");
        const modalDate = document.getElementById("modalDate");
        const modalBody = document.getElementById("modalBody");

        if (!modal) {
            return;
        }

        modalDate.textContent = `${dateStr} 訓練紀錄`;
        modalBody.innerHTML = "";

        records.forEach(function (r) {
            const item = document.createElement("div");
            item.className = "modal-record-item";
            item.innerHTML = `
            <p><strong>總距離：</strong>${r.totalDis || 0} 公尺</p>
            <p><strong>分項：</strong>蝶 ${r.butterfly || 0}m | 仰 ${r.backstroke || 0}m | 蛙 ${r.breaststroke || 0}m | 自 ${r.freestyle || 0}m</p>
            <p><strong>時間：</strong>${r.durationM || 0}分 ${r.durations || r.durationS || 0}秒</p>
            ${r.notes ? `<p><strong>備註：</strong>${r.notes}</p>` : ""}
            `;
            modalBody.appendChild(item);
        });

        modal.style.display = "flex";
    }

    document.addEventListener("DOMContentLoaded", function () {
    renderCalendar();

    const prevBtn = document.getElementById("prevMonthBtn");
    const nextBtn = document.getElementById("nextMonthBtn");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("dayDetailModal");

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
        currentNavDate.setMonth(currentNavDate.getMonth() - 1);
        renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
        currentNavDate.setMonth(currentNavDate.getMonth() + 1);
        renderCalendar();
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        });
    }
});
