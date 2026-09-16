
document.addEventListener("DOMContentLoaded", function () {
    const bigBtn = document.querySelectorAll(".big-btn");
    const header = document.querySelector("header");
    const backBtn = document.querySelectorAll(".back-btn");

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



let trainingRecords = JSON.parse(localStorage.getItem("swimRecords")) || [];

document.addEventListener("DOMContentLoaded", function () {
  const swimForm = document.getElementById("swimForm");
  const successMsg = document.getElementById("successMsg");


  function updateTotalDistance() {
    const butterfly = Number(document.getElementById("butterfly").value) || 0;
    const backstroke = Number(document.getElementById("backstroke").value) || 0;
    const breaststroke = Number(document.getElementById("breaststroke").value) || 0;
    const freestyle = Number(document.getElementById("freestyle").value) || 0;

 
    const totalDisCalc = butterfly + backstroke + breaststroke + freestyle;


    const totalDis = document.querySelector("#totalDis");
    if (totalDis) {
      totalDis.textContent = totalDisCalc;
    }

    return totalDisCalc;
  }


  const styleInputs = document.querySelectorAll("#butterfly, #backstroke, #breaststroke, #freestyle");
  styleInputs.forEach(function (input) {
    input.addEventListener("input", updateTotalDistance);
  });


  if (swimForm) {
    swimForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const currentTotal = updateTotalDistance();

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


      swimForm.reset();

   
      const totalDis = document.querySelector("#totalDis");
      if (totalDis) {
        totalDis.textContent = 0;
      }

      updateBestRecords();
      updateWeekRecords();
      renderCalendar();

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


      const targetPage = document.querySelector("#" + targetId + "Page");
      if (targetPage) {
        targetPage.classList.add("active");
      }
    });
  });


    });
  }
});


