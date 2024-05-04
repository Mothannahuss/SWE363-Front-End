document.addEventListener("DOMContentLoaded", function () {
    const followBtns = document.querySelectorAll(".form-check-input");

    followBtns.forEach(option => {
        option.addEventListener("change", e => {
            if (e.target.checked) {
                option.style.backgroundColor = "#1B08DA";
            } else {
                option.style.backgroundColor = "white";
            }
        });
    });
});
