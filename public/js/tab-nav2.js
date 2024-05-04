document.addEventListener("DOMContentLoaded", function () {
    const sec1 = document.getElementById("sec1");
    const sec2 = document.getElementById("sec2");
    const sec1tog = document.getElementById("sec1tog");
    const sec2tog = document.getElementById("sec2tog");

    sec1tog.addEventListener("click", e => {
        e.preventDefault();
        sec2.setAttribute("hidden", "");
        sec1.removeAttribute("hidden");
        sec2tog.classList.remove("active");
        sec1tog.classList.add("active");
    });

    sec2tog.addEventListener("click", e => {
        e.preventDefault();
        sec1.setAttribute("hidden", "");
        sec2.removeAttribute("hidden");
        sec1tog.classList.remove("active");
        sec2tog.classList.add("active");
    });
});
