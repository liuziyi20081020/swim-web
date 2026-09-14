// document.addEventListener("DOMContentLoaded", function() {

// bigBtn.forEach(function(btn) {
//     btn.addEventListener("click", function() {
//         document.querySelectorAll(".big-btn").forEach(function(b) {
//         b.classList.remove("active");
//     });
//         document.querySelectorAll(".page").forEach(function(p) {
//         p.classList.remove("active");
//     });
//         this.classList.add("active");
//         const targetPage = document.querySelector("#" + this.id + "Page");
//         if(targetPage) {
//             targetPage.classList.add("active");
//         } else {
//             alert("aaa");
//         }
//     });
// });

// });

document.addEventListener("DOMContentLoaded", function () {
    const bigBtn = document.querySelectorAll(".big-btn");
    const header = document.querySelector("header"); // 包含標題與所有按鈕的標籤
    const backBtn = document.querySelectorAll(".back-btn"); // 所有的返回按鈕

  // 1. 給「所有」選單按鈕綁定點擊事件
    bigBtn.forEach(function (btn) {
        btn.addEventListener("click", function () {
      // (1) 隱藏所有頁面
        document.querySelectorAll(".page").forEach(function (p) {
            p.classList.remove("active");
      });

      // (2) 顯示被點擊對應的頁面 (例如點 train 顯示 #trainPage)
        const targetPage = document.querySelector("#" + this.id + "Page");
        if (targetPage) {
            targetPage.classList.add("active");

            // (3) 關鍵：不管點哪一個按鈕，只要有成功找到頁面，就把首頁 header 隱藏
            if (header) {
            header.classList.add("hidden");
            }
        } else {
            alert("找不到對應的頁面：" + this.id + "Page");
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

