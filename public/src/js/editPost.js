document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("submitPost")
    button.addEventListener("click", (e) => {
     e.preventDefault()
     sendEvent()
    })
 });
 
 
 async function sendEvent(){
     let title = document.getElementById("title")
     let date = document.getElementById("date")
     let time = document.getElementById("time")
     let building = document.getElementById("building")
     let room = document.getElementById("room")
     let description = document.getElementById("desc")
     let poster = document.getElementById("poster")
     let link = document.getElementById("link")
     let clubId = document.getElementById("clubId")
     let clubName = document.getElementById("clubName")
     let eventId = document.getElementById("eventId")
 
     let location = (room.value == "") ? "Building: " + building.value: "Building: " + building.value + ", Room: " + room.value
     let dateobj = new Date(date.value +" " + time.value)
     date = dateobj.toISOString()
     fetch("myprofile/editPost", {
         method: "POST",
         headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
         body: JSON.stringify({
             _id: eventId.value,
             club_id: clubId.value,
             club_name: clubName.value,
             title: title.value,
             date: date,
             location: location,
             description: description.value,
             poster: poster.value,
             link: link.value,
         })
     })
 
 }