function updateBestRecords() {
  const records = JSON.parse(localStorage.getItem("swimRecords")) || [];
  if (records.length === 0) {
    return;
  } 

  let maxDisRecord = records[0];
  let best50 = null;
  let best100 = null;
  let best200 = null;


  records.forEach(function(r) {
    const totalSec = (Number(r.durationM) || 0) * 60 + (Number(r.durationS) || 0);
    r.totalSec = totalSec;

    const currentDis = Number(r.totalDis) || 0;
    const maxDis = Number(maxDisRecord.totalDis) || 0;
    if (currentDis > maxDis) {
      maxDisRecord = r;
    }

    if (r.totalDis === 50) {
        if (!best50 || totalSec < best50.totalSec) {
            best50 = r;
        }
    }
    if (r.totalDis === 100) {
        if (!best100 || totalSec < best100.totalSec) {
            best100 = r;
        }
    }
    if (r.totalDis === 200) {
        if (!best200 || totalSec < best200.totalSec) {
            best200 = r;
        }
    }
  });

    if (maxDisRecord) {
        const bestDis = document.getElementById("bestDis");
        const bestDisDate = document.getElementById("bestDisDate");
        if (bestDis) {
            bestDis.textContent = `${maxDisRecord.totalDis} 公尺`;
        }

        if (bestDisDate) {
            bestDisDate.textContent = maxDisRecord.date || "未填寫";
        }
    }


    if (best50) {
        const best50Time = document.getElementById("best50Time");
        const best50Date = document.getElementById("best50Date");
        if (best50Time) {
            best50Time.textContent = `${best50.durationM}分 ${best50.durationS}秒`;
        }

        if (best50Date) {
            best50Date.textContent = best50.date || "未填寫";
        }
    }


    if (best100) {
        const best100Time = document.getElementById("best100Time");
        const best100Date = document.getElementById("best100Date");
        if (best100Time) {
            best100Time.textContent = `${best100.durationM}分 ${best100.durationS}秒`;
        }

        if (best100Date) {
            best100Date.textContent = best100.date || "未填寫";
        }
    }


    if (best200) {
        const best200Time = document.getElementById("best200Time");
        const best200Date = document.getElementById("best200Date");
        if (best200Time) {
            best200Time.textContent = `${best200.durationM}分 ${best200.durationS}秒`;
        }
        if (best200Date) {
            best200Date.textContent = best200.date || "未填寫";
        }
    }
    

    document.addEventListener("DOMContentLoaded", function () {
        updateBestRecords();
    });
}