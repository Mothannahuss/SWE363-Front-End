document.addEventListener("DOMContentLoaded", function () {
    const url = "http://127.0.0.1:8001";
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

    loginf.addEventListener("submit", async e => {
        e.preventDefault();
        if (!(emailValidation(emailli.value.trim(), emailli) & passValidation(passli.value, passli))){
            alert("Fill all fields correctly.");
        }
        const payload = JSON.stringify({
            "email": emailli.value.trim(),
            "password": passli.value
        });
        const [res, status] = await fetchHelper((url + "/login"), "POST", payload);
        if (status === 201) {
            console.log(res);
            localStorage.setItem("user", JSON.stringify(res.user));
            if (res.user.is_club) localStorage.setItem("club", JSON.stringify(res.club));
            window.location.replace(url + `/home?userId=${res.user._id}&today=${Date.now()}`)
        }
        alert(JSON.stringify(res.message));
    });

    forgotli.addEventListener("click", async e => {
        e.preventDefault();
        if (emailValidation(emailli.value.trim(), emailli)) {
            const payload = JSON.stringify({
                "email": emailli.value.trim()
            });
            const [res, status] = await fetchHelper((url + "/forgot"), "POST", payload);
            alert(JSON.stringify(res.message));
        }
    });

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
        rePassValidation(passsu.value, passsure.value, passsure);
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
        if (!(emailValidation(emailsu.value.trim(), emailsu) & passValidation(passsu.value, passsu) & rePassValidation(passsu.value, passsure.value, passsure))){
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

    const fetchHelper = async (url, method, payload) => {
        let status;
        let request = new Request(url, {
            method: method,
        });
        if (method == "POST") {
            request = new Request(url, {
                method: method,
                body: payload,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
        }
        const res = await fetch(request)
            .then((response) => {
                if ((response.status >= 200) && (response.status < 600)) {
                    status = response.status;
                    return response.json();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    
        return [res, status];
    };
});
