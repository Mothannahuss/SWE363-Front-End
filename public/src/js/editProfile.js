document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("submitPost")
    button.addEventListener("click", (e) => {
     e.preventDefault()
     editProfile()
    })
 });
 
 
 async function editProfile(){
    let _id = document.getElementById("_id")
     let handler = document.getElementById("handler")
     let categories = document.getElementById("categories")
     let bio = document.getElementById("bio")
     let about = document.getElementById("about")
 
     fetch("myprofile/editPost", {
         method: "POST",
         headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
         body: JSON.stringify({
             _id: _id.value,
             handler: handler.value,
             categories: categories.value.split(","),
             bio: bio.value,
             about: about.value,
         })
     })
 
 }