document.addEventListener("DOMContentLoaded", function () {
    const sec1 = document.getElementById("sec1");
    const sec2 = document.getElementById("sec2");
    const sec3 = document.getElementById("sec3");
    const sec1tog = document.getElementById("sec1tog");
    const sec2tog = document.getElementById("sec2tog");
    const sec3tog = document.getElementById("sec3tog");

    sec1tog.addEventListener("click", e => {
        e.preventDefault();
        sec2.setAttribute("hidden", "");
        sec3.setAttribute("hidden", "");
        sec1.removeAttribute("hidden");
        sec2tog.classList.remove("active");
        sec3tog.classList.remove("active");
        sec1tog.classList.add("active");
    });

    sec2tog.addEventListener("click", e => {
        e.preventDefault();
        sec1.setAttribute("hidden", "");
        sec3.setAttribute("hidden", "");
        sec2.removeAttribute("hidden");
        sec1tog.classList.remove("active");
        sec3tog.classList.remove("active");
        sec2tog.classList.add("active");
    });

    sec3tog.addEventListener("click", e => {
        e.preventDefault();
        sec1.setAttribute("hidden", "");
        sec2.setAttribute("hidden", "");
        sec3.removeAttribute("hidden");
        sec1tog.classList.remove("active");
        sec2tog.classList.remove("active");
        sec3tog.classList.add("active");
    });
});
