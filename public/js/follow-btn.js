document.addEventListener("DOMContentLoaded", function () {
    const followBtns = document.querySelectorAll(".follow-btn");

    followBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("btn-outline-primary")) {
                btn.classList.remove("btn-outline-primary");
                btn.classList.add("btn-primary");
                btn.innerHTML = "Follow";
            } else {
                btn.classList.add("btn-outline-primary");
                btn.classList.remove("btn-primary");
                btn.innerHTML = "Unfollow";
            }
        });
    });
});
