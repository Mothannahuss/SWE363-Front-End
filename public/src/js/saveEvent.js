document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("saveEventButton")
    button.addEventListener("click", (e) => {
     e.preventDefault()
     saveEvent()
    })
 });

 async function saveEvent(){
    const paths = window.location.pathname.split("/").filter(path => path !== "");
    const eventId = paths[paths.length - 1]
    const userId = localStorage.getItem("user")._id
    fetch("/api/events/save", {
        method: "POST",
        headers: {
           "Content-type": "application/json; charset=UTF-8"
         },
        body: JSON.stringify({
            userId : userId,
            eventId:eventId,
        })
    })

}

