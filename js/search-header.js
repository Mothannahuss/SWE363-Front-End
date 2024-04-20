document.addEventListener("DOMContentLoaded", function () {
    const backBtn = document.getElementById("back-btn");
    const searchBtn = document.getElementById("search-btn");
    const head1 = document.getElementById("header1");
    const head2 = document.getElementById("header2");

    backBtn.addEventListener("click", () => {
        head1.removeAttribute("hidden");
        head2.setAttribute("hidden", "");
    });

    searchBtn.addEventListener("click", () => {
        head1.setAttribute("hidden", "");
        head2.removeAttribute("hidden");
    });
});
