
// DOMContentLoaded -> 等HTML載入完才執行
document.addEventListener("DOMContentLoaded", function () {
    const bigBtn = document.querySelectorAll(".big-btn");
    const header = document.querySelector("header");
    const backBtn = document.querySelectorAll(".back-btn");


    // 按下四個主要按鈕時
    bigBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {

        document.querySelectorAll(".page").forEach(function (p) {
            p.classList.remove("active");
      });

        const targetPage = document.querySelector("#" + this.id + "Page");
        if (targetPage) {
            targetPage.classList.add("active");

            if (header) {
            header.classList.add("hidden");
            }
        } else {
            alert("找不到：" + this.id + "Page");
        }
        });
    });

    // 回首頁按鈕
    backBtn.forEach(function (backBtn) {
        backBtn.addEventListener("click", function () {
        document.querySelectorAll(".page").forEach(function (p) {
            p.classList.remove("active");
        });

        if (header) {
            header.classList.remove("hidden");
        }
        });
    });
});


// 取出之前的紀錄轉回陣列
let trainingRecords = JSON.parse(localStorage.getItem("swimRecords")) || [];

document.addEventListener("DOMContentLoaded", function () {
  const swimForm = document.getElementById("swimForm");
  const successMsg = document.getElementById("successMsg");


  function updateTotalDistance() {
    const butterfly = Number(document.getElementById("butterfly").value) || 0;
    const backstroke = Number(document.getElementById("backstroke").value) || 0;
    const breaststroke = Number(document.getElementById("breaststroke").value) || 0;
    const freestyle = Number(document.getElementById("freestyle").value) || 0;

  // 計算總距離
    const totalDisCalc = butterfly + backstroke + breaststroke + freestyle;
    const totalDis = document.querySelector("#totalDis");
    if (totalDis) {
      totalDis.textContent = totalDisCalc;
    }

    return totalDisCalc;
  }

  // 即時更新總距離
  const styleInputs = document.querySelectorAll("#butterfly, #backstroke, #breaststroke, #freestyle");
  styleInputs.forEach(function (input) {
    input.addEventListener("input", updateTotalDistance);
  });


  if (swimForm) {
    swimForm.addEventListener("submit", function (e) {
      // 阻止表單預設的重新整理
      e.preventDefault();   

      const currentTotal = updateTotalDistance();

      // 記錄的資料
      const recordData = {
        id: Date.now(),
        date: document.getElementById("date").value,
        butterfly: Number(document.getElementById("butterfly").value) || 0,
        backstroke: Number(document.getElementById("backstroke").value) || 0,
        breaststroke: Number(document.getElementById("breaststroke").value) || 0,
        freestyle: Number(document.getElementById("freestyle").value) || 0,
        totalDis: currentTotal,
        durationM: Number(document.getElementById("duraitonM").value) || 0,
        durationS: Number(document.getElementById("duraitonS").value) || 0,
        notes: document.getElementById("notes").value
      };

      trainingRecords.push(recordData);
      localStorage.setItem("swimRecords", JSON.stringify(trainingRecords));


      if (successMsg) {
        successMsg.style.display = "block";
      }

      // 清空表單
      swimForm.reset();
      // 總距離歸零
      const totalDis = document.querySelector("#totalDis");
      if (totalDis) {
        totalDis.textContent = 0;
      }

      updateBestRecords();
      updateWeekRecords();
      renderCalendar();


    // 頁面跳轉
    const formGoBtn = document.querySelectorAll(".form-go-btn");
    formGoBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");


      if (successMsg) {
        successMsg.style.display = "none";
      }


      document.querySelectorAll(".page").forEach(function (p) {
        p.classList.remove("active");
      });

      // 刷新資料
      if(targetId === "week" || targetId === "weekPage") {
        if(typeof updateWeekRecords === "function") {
          updateWeekRecords();
        }
      }

      if(targetId === "calendar" || targetId === "calendarPage") {
        if(typeof renderCalendar === "function") {
          renderCalendar();
        }
      }

      const targetPage = document.querySelector("#" + targetId + "Page");
      if (targetPage) {
        targetPage.classList.add("active");
      }
    });
  });


    });
  }
});


