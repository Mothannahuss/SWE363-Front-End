const url = "http://127.0.0.1:8001";
let myFeed = [];
const explore = [];
const upcomingClub = [];
const allClub = [];
const allSavedEvent = [];
const upcomingSavedEvent= [];
const newNoti = [];
const previousNoti = [];
const browse = [];
let user = {};

async function fetchHelper(url, method, payload) {
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

async function getMyFeed() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/home/myfeed?userId=${user._id}&today=${Date.now()}`;

    const array = await fetchHelper(urlsub, "GET", "");
    let data =  JSON.stringify(array[0]);
    if ((array[1] >= 200) && (array[1] < 400)) {
        myFeed.push(JSON.parse(data));
        showEvents(myFeed, "sec1");
    }
    console.log("error", array);
};

async function getExplore() {
    const urlsub = url + `/home/explore?today=${Date.now()}`;

    const array = await fetchHelper(urlsub, "GET", "");
    if ((array >= 200) && (array < 400)) {
        explore = array;
        showEvents(explore, "sec2");
    }
    console.log("error", array);
};

async function getUpcomingForClubs() {
    const user = localStorage.getItem("user");
    const urlsub = url + `/club/upcoming?userId=${user._id}&today=${Date.now()}`;

    const array = await fetchHelper(urlsub, "GET", "");
    if ((array >= 200) && (array < 400)) {
        upcomingClub = array;
        showEvents(upcomingClub, "sec1");
    }
    console.log("error", array);
};

async function getAllForClubs() {
    const user = localStorage.getItem("user");
    const urlsub = url + `/club/all?userId=${user._id}&today=null`;

    const array = await fetchHelper(urlsub, "GET", "");
    if ((array >= 200) && (array < 400)) {
        allClub = array;
        showEvents(allClub, "sec2");
    }
    console.log("error", array);
};

async function getAllSavedEvent() {
    const user = localStorage.getItem("user");
    const urlsub = url + `/savedevents/all?userId=${user._id}&today=null`;

    const array = await fetchHelper(urlsub, "GET", "");
    if ((array >= 200) && (array < 400)) {
        allSavedEvent = array;
        showEvents(allSavedEvent, "sec2");
    }
    console.log("error", array);
};

async function getUpcomingSavedEvent() {
    const user = localStorage.getItem("user");
    const urlsub = url + `/savedevents/upcoming?userId=${user._id}&today=${Date.now()}`;

    const array = await fetchHelper(urlsub, "GET", "");
    if ((array >= 200) && (array < 400)) {
        upcomingSavedEvent = array;
        showEvents(upcomingSavedEvent, "sec1");
    }
    console.log("error", array);
};

async function getNewNotification() {

};

async function getPreNotification() {

};

async function getBrowse() {

};



function showNotifications (eventList, section){
    const notifications = document.getElementById(section);
    notifications.innerHTML = "";

    eventList.forEach(event =>{
        notCard = `
        <div class="post-notification" id =${event._id}>
        <img class= "event-avatar" src="${event.poster}" alt="poster">
        <div class="event-avatar"></div>
        <div class="post-content">
          <h2 class="new-post"><a href="${url + "/home/event?eventId=" + event._id}">${event.title}</a></h2>
          <p>${event.club_name} posted an event</p>
        </div>
        </div>`
        notifications += notCard;
    })
}

/**
 * 
 * @param {List<event>} eventList this is the list of events that will be added to 
 * @param {String} section the section that you will add events to
 */
async function showEvents (eventList, section) {
    const events = document.getElementById(section);
    events.innerHTML = "";

    eventList[0].forEach(event => {

        event.date = new Date(event.date)
        eventCard = `
        <div class="event-card" id= ${event._id}>
            <img class= "event-avatar" src="${event.avatar}" alt="poster">
            <div class="event-content">
            <div class="event-details">
                <a class="event-club" href="/">${event.club_name}</a>
                <h2 class="event-title">${event.title}</h2>
                <div class="event-info">
                    <p><i class="fas fa-calendar-alt"></i>${ event.date.toLocaleDateString("en-us", { weekday: 'long' }) }, ${event.date.getDate() +"/" + (event.date.getMonth() + 1 )}</p>
                    <p><i class="fas fa-clock"></i> ${event.date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
            </div>
            <a class="view-event-btn" href="${url + "/home/event/eventId=" + event._id}">View Event</a>
            </div>
        </div>`
        events.innerHTML += eventCard;
    });
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



document.addEventListener("DOMContentLoaded", async function()
{

    let current_url = document.location.href.split("/");
    let page = current_url[current_url.length - 1];

    let singInForm = document.getElementById("login");


    if (page != "home")
        {
            singInForm.addEventListener("submit", async function(e)
                {
                    e.preventDefault();
                    let email = document.getElementById("InputEmail1").value;
                    let password = document.getElementById("InputPassword").value;



                    let data = await fetchHelper(url + "/login","POST", JSON.stringify({email: email, password: password}));
                    localStorage.setItem("user",JSON.stringify(data[0].user));

                    window.location.href= url + "/home";
                })
        }



    if (page == "home")
    {
        let sec1 = document.getElementById("sec1");
        let today = new Date();
        let userId = JSON.parse(localStorage.getItem("user"))._id;

        await getMyFeed();
    }




})
