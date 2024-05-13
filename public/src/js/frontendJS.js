

function showNotifications (eventList, section){
    const notifications = document.getElementById(section);

    notifications.innerHTML = "";


    eventList.forEach(event =>{
        notCard = `<div class="post-notification" id =${event._id}>
        <img class= "event-avatar" src="${event.poster}" alt="poster">
        <div class="event-avatar"></div>
        <div class="post-content">
          <h2 class="new-post"><a href="/">${event.title}</a></h2>
          <p>${event.club_name} posted an event</p>
        </div>
        </div>`
       notifications += notCard;
    })
}

function showEvents (eventList, section){
    const events = document.getElementById(section)

    events.innerHTML = "";

    eventList.forEach(event => {
        eventCard = `<div class="event-card" id= ${event._id}>
        <img class= "event-avatar" src="${event.poster}" alt="poster">
        <div class="event-content">
        <div class="event-details">
            <a class="event-club" href="/">${event.club_name}</a>
            <h2 class="event-title">${event.title}</h2>
            <div class="event-info">
                <p><i class="fas fa-calendar-alt"></i>${ event.date.toLocaleDateString(locale, { weekday: 'long' }) }, ${event.date.getDate() +"/" + (event.date.getMonth() + 1 )}</p>
                <p><i class="fas fa-clock"></i> ${event.date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            </div>
        </div>
        <a class="view-event-btn" href="./events/${event._id}">View Event</a>
        </div>
    </div>`
    events.innerHTML += eventCard;
    })

}

function showClubs (clubList, User){
    const clubs = document.getElementById("myClubs")

    clubs.innerHTML = "";

    clubList.forEach(club => {
        if (club in User.following){
            btn_txt = "Unfollow";
            toggle_value = 1;
        }
        else{
            btn_txt = "Follow";
            toggle_value = 0;
        }
        clubCard = `<div class="club-card" id=${club._id}>
        <img class= "club-avatar" src="${club.avatar}" alt="avatar">
        <div class="club-detail">
          <h2><a href="/">${club.name}</a></h2>
          <p>${club.bio}</p>
        </div>
        <form action="/follow" method="post">
        <input hidden name="club_name" value="${club.name}"/>
        <input hidden name="userId" value="${User._Id}"/>
        <input hidden name="toggle" value="${toggle_value}"
        <button class="btn btn-outline-primary follow-btn">${btn_txt}</button>
        </form>
      </div> `
      clubs.innerHTML += clubCard;
    })
}
