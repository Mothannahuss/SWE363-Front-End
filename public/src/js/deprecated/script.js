document.addEventListener("DOMContentLoaded", function()
{






    // Input form validation for login page
    document.querySelector('#loginBtn').addEventListener("click", function(e)
    {
        let email = document.querySelector("#InputEmail1").value;
        let password = document.querySelector("#InputPassword").value;

        if (email.length == 0 || password.length == 0)
        {
            e.preventDefault();
            let node = document.createElement("p");
            node.innerText = "Please fill both your email and password.";
            node.style.color = "#1B08DA";
            document.querySelector(".signIn_form").appendChild(node);
        }
    });

    document.querySelector("#InputEmail1").addEventListener("input", function()
{
    let node = document.querySelector(".signIn_form").lastChild;

    if (node.nodeName === "P")
    {
        document.querySelector(".signIn_form").removeChild(node);
    }
})

document.querySelector("#InputPassword").addEventListener("input", function()
{
    let node = document.querySelector(".signIn_form").lastChild;

    if (node.nodeName === "P")
    {
        document.querySelector(".signIn_form").removeChild(node);
    }
})



})