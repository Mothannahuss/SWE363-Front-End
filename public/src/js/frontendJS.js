const url = "http://127.0.0.1:8001";
var myFeed = [];
var explore = [];
var myClubs = [];
var upcomingClub = [];
var allClub = [];
var allSavedEvent = [];
var upcomingSavedEvent= [];
var newNoti = [];
var previousNoti = [];
var browse = [];
let user = {};
const all_interests = [
    "Debate and Speech",
    "Film and Photography",
    "Gaming",
    "Literature",
    "Religious" ,
    "Sports",
    "Mechanical Engineering",
    "Chemical Engineering",
    "Industrial Engineering",
    "Electrical Engineering",
    "Architecture",
    "Computer",
    "Business",
    "Mathematics",
    "Petroleum Engineering",
    "Visitation" ,
    "Consulting"];

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
    const urlsub = url + `/home/myfeed?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        myFeed = array;
        showEvents(myFeed, "sec1");
    }
    console.log("error", array);
};

async function getExplore() {
    const urlsub = url + `/home/explore?today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        explore = array;
        showEvents(explore, "sec2");
    }
    console.log("error", array);
};

async function getMyClubs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/myclubs/all?userId=${user._id}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        explore = array;
        showClubs(explore, "myClubs");
    }
    console.log("error", array);
};

async function getUpcomingForClubs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/club/upcoming?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        upcomingClub = array;
        showEvents(upcomingClub, "sec1");
    }
    console.log("error", array);
};

async function getAllForClubs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/club/all?userId=${user._id}&today=null`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        allClub = array;
        showEvents(allClub, "sec2");
    }
    console.log("error", array);
};

async function getAllSavedEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/savedevents/all?userId=${user._id}&today=null`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        allSavedEvent = array;
        showEvents(allSavedEvent, "sec2");
    }
    console.log("error", array);
};

async function getUpcomingSavedEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/savedevents/upcoming?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        upcomingSavedEvent = array;
        showEvents(upcomingSavedEvent, "sec1");
    }
    console.log("error", array);
};

async function getNewNotification() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/notification/new?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        newNoti = array;
        showNotifications(newNoti, "sec1");
    }
    console.log("error", array);
};

async function getPreNotification() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/notification/previous?userId=${user._id}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        previousNoti = array;
        showNotifications(previousNoti, "sec2");
    }
    console.log("error", array);
};

async function getBrowse() {
    const user = JSON.parse(localStorage.getItem("user"));
    const category = "null"//HOW??
    const urlsub = url + `/notification/previous?category=${category}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        browse = array;
        showClubs(browse, user);
    }
    console.log("error", array);
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
    const user = JSON.parse(localStorage.getItem("user"));
    const events = document.getElementById(section);
    events.innerHTML = "";

    eventList.forEach(event => {

        event.date = new Date(event.date)
        eventCard = `
        <div class="event-card" id= ${event._id}>
            <img class= "event-avatar" src="${event.poster}" alt="poster">
            <div class="event-content">
            <div class="event-details">
                <a class="event-club" href=${url + "/club?clubId=" + event.club_id + "&userId=" + user._id + "&isClub=" + user.is_club}>${event.club_name}</a>
                <h2 class="event-title">${event.title}</h2>
                <div class="event-info">
                    <p><i class="fas fa-calendar-alt"></i>${ event.date.toLocaleDateString("en-us", { weekday: 'long' }) }, ${event.date.getDate() +"/" + (event.date.getMonth() + 1 )}</p>
                    <p><i class="fas fa-clock"></i> ${event.date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
            </div>
            <a class="view-event-btn" href="${url + "/home/event?eventId=" + event._id}">View Event</a>
            </div>
        </div>`
        events.innerHTML += eventCard;
    });
}

function showClubs (clubList, User){
    const user = JSON.parse(localStorage.getItem("user"));
    const clubs = document.getElementById("myClubs")

    clubs.innerHTML = "";

    clubList.forEach(club => {
        if (club.name in user.following){
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
          <h2><a href=${url + "/club?clubId=" + club._id + "&userId=" + user._id + "&isClub=" + user.is_club}}>${club.name}</a></h2>
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
    let page = current_url ? current_url[current_url.length - 1] : "login";

    let singInForm = document.getElementById("login");


    if (page == "login")
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
        await getMyFeed();
        let sec1 = document.getElementById("sec1");
        let sec2 = document.getElementById("sec2");
        let today = new Date();
        let userId = JSON.parse(localStorage.getItem("user"))._id;

        let myFeed= document.getElementById("sec1tog");
        let explore= document.getElementById("sec2tog");

        myFeed.addEventListener("click", async function()
        {
            myFeed.classList.add("active");
            explore.classList.remove("active");
            sec1.hidden = false;
            sec2.hidden = true;
            await getMyFeed();
        })

        explore.addEventListener("click", async function(){
            myFeed.classList.remove("active");
            explore.classList.add("active");
            sec1.hidden = true;
            sec2.hidden = false;
            await getExplore();

        })

    }
    else if (page == "browse")
    {

    }
})

function addMyProfile() {
    const menus = document.querySelectorAll(".menuList");
    const user = JSON.parse(localStorage.getItem("user"));
    menus.forEach(menu => {
        if (user.is_club) {
            const el = document.createElement("li");
            el.classList.add("nav-item");
            el.innerHTML = `<a class="nav-link" href=${url + "/club?userId="}>My Profile</a>`;
            menu.appendChild(el);
        }
    });
}

function onLoadHome() {
    addMyProfile();
    getMyFeed();
    getExplore();
};

function onLoadClubs() {
    addMyProfile();
    getMyClubs();
};

function onLoadProfile() {
    console.log("tt")
    addMyProfile();
    getUpcomingForClubs();
    getAllForClubs();
};
