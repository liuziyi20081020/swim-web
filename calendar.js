let currentNavDate = new Date();

function renderCalendar() {
    const records = JSON.parse(localStorage.getItem("swimRecords")) || [];
    const monthYear = document.getElementById("calendarMonthYear");
    const days = document.getElementById("calendarDays");

    // 找不到calendarMonthYear or calendarDays 就直接回傳
    if (!days || !monthYear) {
        return;
    }

    const year = currentNavDate.getFullYear();
    const month = currentNavDate.getMonth();

    // 標題顯示年月 (month + 1 因為月份從0開始 但沒有0月)
    monthYear.textContent = `${year} 年 ${month + 1} 月`;
    // 清空days避免重複疊加
    days.innerHTML = "";

    // 取得本月一號是星期幾 回傳的數字 0= 日, 1= 一, = 前面空幾格對齊星期
    const firstDay = new Date(year, month, 1).getDay();

    // 取得本月最後一天(日期傳0 會變成上個月最後一天)
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 讓一號對其正確星期 firstDay 個空白格
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "day empty";
        days.appendChild(emptyDiv);
    }

    // 建立每天的紀錄框
    for (let day = 1; day <= lastDate; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        // padStart: 把字串補到指定長度 ex. 11/4 -> 11/04
        const mStr = String(month + 1).padStart(2, "0");
        const dStr = String(day).padStart(2, "0");
        const formattedDate = `${year}-${mStr}-${dStr}`;

        dayDiv.innerHTML = `<span class="day-num">${day}</span>`;

        // filter 找出該日期的所有紀錄
        const dayRecords = records.filter(function (r) {
        return r.date === formattedDate;
        });

        // 有紀錄就加上has-record 的類別 reduce 加總當天距離
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

        // 把元素加到父元素後面 -> 建立的格子放進月曆最後
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
        // 標題設定: 日期 訓練紀錄
        modalDate.textContent = `${dateStr} 訓練紀錄`;

        // 以防新紀錄疊加在舊紀錄上面
        modalBody.innerHTML = "";

        records.forEach(function (r) {
            //幫每一筆紀錄建立一個區塊 
            const item = document.createElement("div");
            item.className = "modal-record-item";

            // 顯示這些紀錄
            item.innerHTML = `
            <p><strong>總距離：</strong>${r.totalDis || 0} 公尺</p>
            <p><strong>分項：</strong>蝶 ${r.butterfly || 0}m | 仰 ${r.backstroke || 0}m | 蛙 ${r.breaststroke || 0}m | 自 ${r.freestyle || 0}m</p>
            <p><strong>時間：</strong>${r.durationM || 0}分 ${r.durations || r.durationS || 0}秒</p>
            ${r.notes ? `<p><strong>備註：</strong>${r.notes}</p>` : ""}
            `;
            modalBody.appendChild(item);
        });

        // 顯示記錄彈窗
        modal.style.display = "flex";
    }

    // HTML 執行完先畫一次月曆
    document.addEventListener("DOMContentLoaded", function () {
    renderCalendar();

    const prevBtn = document.getElementById("prevMonthBtn");
    const nextBtn = document.getElementById("nextMonthBtn");
    const closeModal = document.getElementById("closeModal");
    const modal = document.getElementById("dayDetailModal");

    // 上個月/ 下個月切換 重新畫月曆
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

    // 關彈窗
    if (closeModal && modal) {
        closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        });
    }
});
