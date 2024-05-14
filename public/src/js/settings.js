
document.addEventListener("DOMContentLoaded", async function()
{
    const all_interests = interests_list;
    let account = document.getElementById("account");
    let notification = document.getElementById("notificationSwitch");
    let interests = document.getElementById("interests-btn");
    let main = document.getElementById("main");


    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("interests", interests_list);


    let user = await JSON.parse(localStorage.getItem("user"));

    
    if (user.allow_notification) {
        notification.checked  = true;
    }
    else{
        notification.checked  = false;
    }


    account.addEventListener("click", function(){

        main.innerHTML = "";


        main.innerHTML += `<div class="mb-3">
        <label for="newEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="newEmail" placeholder="name@example.com">
      </div>`;



        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-outline-primary");
        button.classList.add("col-11");
        button.innerText = "Update";

        main.appendChild(button);


        button.addEventListener("click",async function()
        {
            let newEmail = document.getElementById("newEmail").value;

            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            if (regex.test(newEmail)) {
                user.email = newEmail;
                await update();
                location.reload();
            }
            else
            {
                alert("Please enter a valid email address");
            }



        });

    });


    notification.addEventListener("change", async function()
    {
        user.allow_notification = notification.checked ? true : false;

        await update();

    })






    interests.addEventListener("click",function()
    {
        main.innerHTML = "";

        let form = document.createElement("form");
        let i = 1;
        all_interests.forEach(interest => {
            let content = "";
            if (user.interests.includes(interest))
                {
                    content = `<div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="${interest}"
                      id="opt${i}"
                      checked
                    />
                    <label class="form-check-label" for="opt${i}"> ${interest} </label>
                  </div>`
                }
            else{
                content = `<div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="${interest}"
                      id="opt${i}"
                    />
                    <label class="form-check-label" for="opt${i}"> ${interest} </label>
                  </div>`
            }
            i++;
            form.innerHTML += content;

        });

        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-outline-primary");
        button.classList.add("col-11");
        button.innerText = "Update";
        form.appendChild(button);
        main.appendChild(form);
        form.addEventListener("submit", (e) => {e.preventDefault();});
        button.addEventListener("click",()=>{handleOpts()});


        
        
    });

    async function handleOpts() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Initialize an array to store the values of selected checkboxes
        var selectedOptions = [];

        // Loop through each checkbox to see if it is checked
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                // If checked, add its value (or some identifier) to the array
                selectedOptions.push(checkbox.value); // or checkbox.value if you set meaningful values
            }
        });


        user.interests = selectedOptions; 


        await update();
    }




    async function update()
    {
        await fetch("/settings", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: user._id,
                email: user.email,
                notification: user.allow_notification,
                interests: user.interests
            })
            }).then(res=>{
               console.log(res);
            })
            .catch(err=>console.error(err));


    }


    // notification.addEventListener("change", function(){
    //     let form = document.getElementById("not-form");

    //     form.
    // });
});