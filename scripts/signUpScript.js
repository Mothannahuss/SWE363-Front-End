document.addEventListener("DOMContentLoaded", function()
{




    

    // Checkbox chnage event handling
    document.querySelector("#inlineCheckbox1").addEventListener("change", function(e)
    {
        let box = document.querySelector("#inlineCheckbox1");

        // Color change when chnage happens
        if (e.target.checked)
        {
            box.classList.add("checked-box");
            box.classList.remove("unchecked-box");
        }
        else
        {
            box.classList.remove("checked-box");
            box.classList.add("unchecked-box");
        }
        
    })

    document.querySelector("#inlineCheckbox1").addEventListener("mouseout", function()
    {
        this.blur();
    });


        // Input form validation for sing up page
        document.querySelector('#signUpBtn').addEventListener("click", function(e)
        {
            let email = document.querySelector("#InputEmail1").value;
            let password = document.querySelector("#InputPassword").value;
            let confirm = document.querySelector("#InputConfirm").value;
    
            if (email.length == 0 || password.length == 0 || confirm.length == 0) 
            {
                e.preventDefault();
                let node = document.createElement("p");
                node.innerText = "Please fill both your email and password.";
                node.style.color = "#1B08DA";
                document.querySelector(".signIn_form").appendChild(node);
            }
            else if (confirm != password)
            {
                e.preventDefault();
                let node = document.createElement("p");
                node.innerText = "The confirmation does not match the password";
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


    document.querySelector("#InputConfirm").addEventListener("input", function()
        {
            let node = document.querySelector(".signIn_form").lastChild;
        
            if (node.nodeName === "P")
            {
                document.querySelector(".signIn_form").removeChild(node);
            }
        })


    
    
})