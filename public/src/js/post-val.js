document.addEventListener("DOMContentLoaded", function () {
    const cancelBtn = document.getElementById("cancelPost");
    const submitBtn = document.getElementById("submitPost");
    const postf = document.getElementById("newPost");
    const title = document.getElementById("title");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const desc = document.getElementById("desc");
    const poster = document.getElementById("poster");
    const regLink = document.getElementById("link");

    cancelBtn.addEventListener("click", () => {
        history.back();
    });

    submitBtn.addEventListener("click", () => {
        //Require DataBase.. in phase 6
    });

    title.addEventListener("change", () => {
        titleVal(title.value.trim(), title);
    });

    date.addEventListener("change", () => {
        notEmpty(date.value.trim(), date, "Date");
    });

    time.addEventListener("change", () => {
        notEmpty(time.value.trim(), time, "Time");
    });

    desc.addEventListener("change", () => {
        descVal(desc.value.trim(), desc);
    });

    poster.addEventListener("change", () => {
        posterVal(poster.files[0], poster);
    });

    regLink.addEventListener("change", () => {
        regLinkVal(regLink.value.trim(), regLink);
    });

    postf.addEventListener("submit", e => {
        if (!(titleVal(title.value.trim(), title) & notEmpty(date.value.trim(), date, "Date") & notEmpty(time.value.trim(), time, "Time") &
            descVal(desc.value.trim(), desc) & posterVal(poster.files[0], poster) & regLinkVal(regLink.value.trim(), regLink))) {
            e.preventDefault();
        }
    });

    const titleVal = (value, input) => {
        if (value === "") {
            setError(input, "Title is required");
            return false;
        } else if (value.length > 100) {
            setError(input, "Title shouldn't be more than 100 character");
            return false;
        } else {
            setSuccess(input);
            return true;
        }
    };

    const notEmpty = (value, input, name) => {
        if (value === "") {
            setError(input, `${name} is required`);
            return false;
        } else {
            setSuccess(input);
            return true;
        }
    };

    const descVal = (value, input) => {
        if (value.length > 500) {
            setError(input, "Description shouldn't be more than 500 character");
            return false;
        } else {
            setSuccess(input);
            return true;
        }
    };

    const posterVal = (value, input) => {
        if ((value.size / 1024 / 1024) > 5) {
            setError(input, "Poster size shouldn't exceed 5 MB");
            return false;
        } else {
            setSuccess(input);
            return true;
        }
    };
    
    const regLinkVal = (url, linkInput) => {
        const reg = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        if (!reg.test(String(url).toLowerCase())) {
            setError(linkInput, "Enter a valid link");
            return false;
        } else {
            setSuccess(linkInput);
            return true;
        }
    };

    const setError = (inputTag, msg) => {
        const feedback = inputTag.nextSibling.nextSibling;
        inputTag.classList.add("is-invalid");
        inputTag.classList.remove("is-valid");
        feedback.innerHTML = msg;
    };

    const setSuccess = (inputTag) => {
        const feedback = inputTag.nextSibling.nextSibling;
        inputTag.classList.add("is-valid");
        inputTag.classList.remove("is-invalid");
        feedback.innerHTML = "";
    };
});
