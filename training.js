document.addEventListener("DOMContentLoaded", function() {
    const bigBtn = document.querySelectorAll(".big-btn");

bigBtn.forEach(function(btn) {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".big-btn").forEach(function(b) {
        b.classList.remove("active");
    });
        document.querySelectorAll(".page").forEach(function(p) {
        p.classList.remove("active");
    });
        this.classList.add("active");
        const targetPage = document.querySelector("#" + this.id);
        if(targetPage) {
            targetPage.classList.add("active");
        } else {
            alert("aaa");
        }
    });
});

});
