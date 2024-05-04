document.addEventListener("DOMContentLoaded", function () {
    const loginf = document.getElementById("login");
    const emailli = document.getElementById("InputEmail1");
    const passli = document.getElementById("InputPassword");
    const passlieye = document.getElementById("eyeli");
    const forgotli = document.getElementById("forgotli"); //Require DataBase.. in phase 6
    const signinp = document.getElementById("signin");
    const signupl = document.getElementById("signuplink");
    const signupp = document.getElementById("signUp");
    const signinl = document.getElementById("signinlink");
    const signupf = document.getElementById("signup");
    const emailsu = document.getElementById("InputEmail2");
    const passsu = document.getElementById("InputPassword2");
    const passsueye = document.getElementById("eyesu");
    const passsure = document.getElementById("InputConfirm");
    const passsureeye = document.getElementById("eyesure");

    emailli.addEventListener("change", () => {
        emailValidation(emailli.value.trim(), emailli);
    });

    passli.addEventListener("change", () => {
        passValidation(passli.value.trim(), passli);
    });

    passlieye.addEventListener("click", () => {
        if (passlieye.classList.contains("bi-eye")) {
            passli.setAttribute("type", "password");
            passlieye.classList.remove("bi-eye");
            passlieye.classList.add("bi-eye-slash");
        } else {
            passli.setAttribute("type", "text");
            passlieye.classList.remove("bi-eye-slash");
            passlieye.classList.add("bi-eye");
        }
    });

    // loginf.addEventListener("submit", e => {
    //     if (!(emailValidation(emailli.value.trim(), emailli) & passValidation(passli.value.trim(), passli))){
    //         e.preventDefault();
    //     }
    // });

    signupl.addEventListener("click", e => {
        e.preventDefault();
        signinp.setAttribute("hidden", "");
        signupp.removeAttribute("hidden");
    });

    signinl.addEventListener("click", e => {
        e.preventDefault();
        signinp.removeAttribute("hidden");
        signupp.setAttribute("hidden", "");
    });

    emailsu.addEventListener("change", () => {
        emailValidation(emailsu.value.trim(), emailsu);
    });

    passsu.addEventListener("change", () => {
        passValidation(passsu.value.trim(), passsu);
    });

    passsueye.addEventListener("click", () => {
        if (passsueye.classList.contains("bi-eye")) {
            passsu.setAttribute("type", "password");
            passsueye.classList.remove("bi-eye");
            passsueye.classList.add("bi-eye-slash");
        } else {
            passsu.setAttribute("type", "text");
            passsueye.classList.remove("bi-eye-slash");
            passsueye.classList.add("bi-eye");
        }
    });

    passsure.addEventListener("change", () => {
        rePassValidation(passsu.value.trim(), passsure.value.trim(), passsure);
    });

    passsureeye.addEventListener("click", () => {
        if (passsureeye.classList.contains("bi-eye")) {
            passsure.setAttribute("type", "password");
            passsureeye.classList.remove("bi-eye");
            passsureeye.classList.add("bi-eye-slash");
        } else {
            passsure.setAttribute("type", "text");
            passsureeye.classList.remove("bi-eye-slash");
            passsureeye.classList.add("bi-eye");
        }
    });

    signupf.addEventListener("submit", e => {
        if (!(emailValidation(emailsu.value.trim(), emailsu) & passValidation(passsu.value.trim(), passsu) & rePassValidation(passsu.value.trim(), passsure.value.trim(), passsure))){
            e.preventDefault();
        }
    });

    const emailValidation = (emailValue, emailInput) => {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(emailValue === "") {
            setError(emailInput, "E-mail is required");
            return false;
        } else if (!reg.test(String(emailValue).toLowerCase())) {
            setError(emailInput, "Provide a valid E-mail");
            return false;
        } else {
            setSuccess(emailInput);
            return true;
        }
    };

    const passValidation = (passValue, passInput) => {
        if(passValue === "") {
            setError(passInput, "Password is required");
            return false;
        } else if (passValue.length < 8) {
            setError(passInput, "Password must be at least 8 character");
            return false;
        } else {
            setSuccess(passInput);
            return true;
        }
    };

    const rePassValidation = (pass1Value, pass2Value, pass2Input) => {
        if(pass2Value === "") {
            setError(pass2Input, "Password confirm is required");
            return false;
        } else if (pass2Value === pass1Value) {
            setSuccess(pass2Input);
            return true;
        } else {
            setError(pass2Input, "Password does not match");
            return false;
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
