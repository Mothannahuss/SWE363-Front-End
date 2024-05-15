var url = "http://127.0.0.1:8001";
var myFeed = [];
var explore = [];
var myClubs = [];
var upcomingClub = [];
var allClub = [];
var upcomingMyClub = [];
var allMyClub = [];
var allSavedEvent = [];
var upcomingSavedEvent= [];
var newNoti = [];
var previousNoti = [];
var browse = [];
var user = {};
var all_interests = [
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
        return showEvents(myFeed, "sec1");
    }
    console.log("error", array);
};

async function getExplore() {
    const urlsub = url + `/home/explore?today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        explore = array;
        return showEvents(explore, "sec2");
    }
    console.log("error", array);
};

async function getMyClubs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/myclubs/all?userId=${user._id}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        explore = array;
        return showClubs(explore, "myClubs");
    }
    console.log("error", array);
};

async function getUpcomingForClubs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/club/upcoming?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        upcomingClub = array;
        return showEvents(upcomingClub, "sec1");
    }
    console.log("error", array);
};

async function getAllForClubs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/club/all?userId=${user._id}&today=null`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        allClub = array;
        return showEvents(allClub, "sec2");
    }
    console.log("error", array);
};

async function getUpcomingForMyClub() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/club/upcoming?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        upcomingMyClub = array;
        return showEvents(upcomingMyClub, "sec1");
    }
    console.log("error", array);
};

async function getAllForMyClub() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/club/all?userId=${user._id}&today=null`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        allMyClub = array;
        return showEvents(allMyClub, "sec2");
    }
    console.log("error", array);
};

async function getAllSavedEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/savedevents/all?userId=${user._id}&today=null`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        allSavedEvent = array;
        return showEvents(allSavedEvent, "sec2");
    }
    console.log("error", array);
};

async function getUpcomingSavedEvent() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/savedevents/upcoming?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        upcomingSavedEvent = array;
        return showEvents(upcomingSavedEvent, "sec1");
    }
    console.log("error", array);
};

async function getNewNotification() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/notifications/new?userId=${user._id}&today=${new Date().toISOString()}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        newNoti = array;
        return showNotifications(newNoti, "sec1", "new");
    }
    console.log("error", array);
};

async function getPreNotification() {
    const user = JSON.parse(localStorage.getItem("user"));
    const urlsub = url + `/notifications/previous?userId=${user._id}`;

    const [array, status] = await fetchHelper(urlsub, "GET", "");
    if (status < 204) {
        previousNoti = array;
        return showNotifications(previousNoti, "sec2", "pre");
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
        return showClubs(browse, user);
    }
    console.log("error", array);
};



function showNotifications (eventList, section, type){
    const notifications = document.getElementById(section);
    notifications.innerHTML = "";

    eventList.forEach(event =>{
        let notCard = 
        `<div class="post-notification" id =${event._id}>
        <img class= "event-avatar" src="${event.poster}" alt="poster">
        <div class="post-content">
          <h2 class="new-post"><a href="${url + "/home/event?eventId=" + event._id}">${event.title}</a></h2>
          <p>${event.club_name} posted an event</p>
        </div>
        </div>`;
        notifications.innerHTML += notCard;
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
        let eventCard = `
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
        let clubCard = `<div class="club-card" id=${club._id}>
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

function debounce(func, delay) {
  let debounceTimer;
  return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
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
        let search = document.getElementById("search-input");


        let myFeed= document.getElementById("sec1tog");
        let explore= document.getElementById("sec2tog");
        let eventsToView = document.querySelectorAll(".view-event-btn");
        eventsToView.forEach(btn =>{
            btn.addEventListener("click",async function(e){

                e.preventDefault();
                let link = e.target.href.split("/");
                let eventId = link[link.length - 1];
                console.log(e.target.href);

                let data = await fetchHelper(e.target.href, "GET", "");
                let event = data[0];
                event.date = new Date(event.date);

                document.body.innerHTML = "";

                document.body.innerHTML = `
                <div class="header" id="header1">
                <nav class="navbar">
                  <div class="container-fluid">
                    <div>
                      <h2>Event details</h2>
                      <div class="rectangle"></div>
                    </div>
                    <ul class="navbar-nav d-flex flex-row me-1">
                      <li class="nav-item me-0 me-lg-0">
                        <button
                          class="btn"
                          type="button"
                          id="search-btn"
                          style="border-radius: 90px; border-style: solid"
                        >
                          <i class="bi bi-search"></i>
                        </button>
                      </li>
          
                      <li>
                        <button
                          class="navbar-toggler"
                          type="button"
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasNavbar"
                          aria-controls="offcanvasNavbar"
                          aria-label="Toggle navigation"
                        >
                          <span class="navbar-toggler-icon"></span>
                        </button>
                      </li>
                    </ul>
                    <div
                      class="offcanvas offcanvas-end"
                      tabindex="-1"
                      id="offcanvasNavbar"
                      aria-labelledby="offcanvasNavbarLabel"
                    >
                      <div class="offcanvas-header">
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="offcanvas-body">
                        <ul class="navbar-nav justify-content-end flex-grow-1">
                          <li class="nav-item">
                            <a class="nav-link" href="/home">Home</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/myclubs">My Clubs</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/savedevents">Saved Events</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/browse">Browse Clubs</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/notifications">Notifications</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/settings">Settings</a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link" href="/myprofile">My Profile</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </nav>
                <div class="container">
                <div id="contentHolder">
                  <div class="event-card row">
                    <div class="row d-flex">
                      <img
                      >
                      <div class="event-content col-8">
                        <div class="event-details">
          
                          <h2 class="event-title fs-3">${event.title}</h2>
                          <div class="event-info">
                            <p><i class="fas fa-calendar-alt"></i> ${ event.date.toLocaleDateString("en-us", { weekday: 'long' }) }, ${event.date.getDate() +"/" + (event.date.getMonth() + 1 )}</p>
                            <p><i class="fas fa-clock"></i> ${event.date.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <button id="saveEventButton" type="button">Save Event</button>
                        </div>
                      </div>
                    </div>
                    <h2 class="event-club mt-2 fs-5">Description</h2>
                    <div class="row">
                      <div id="descriptionBox" class="h-25">
                        <p class="text-wrap">${event.description}</p>
                      </div>
                    </div>
                    <h2 class="event-club mt-2 fs-5">Posters</h2>
                    <div class="row h-25">
                        <img src=${event.poster} alt="Event Poster" class="col-auto imageBackground m-1">
                    </div>
                    
                    <div class="d-flex align-self-center justify-content-center row mt-1">
                      <button onclick='window.open("${event.link}", "_blank");' id="registerButton" class="col-4" type="button">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>`
            });
        });

        search.addEventListener('input', debounce(async function(event) {
          let query = event.target.value;
          document.getElementById("sec1").innerHTML = "";
          document.getElementById("sec2").innerHTML = "";

          if (query)
              {
                  query = query.trim().toLowerCase();
              }
          else if (!myFeed.hidden){
              showEvents(myFeed[0], "sec1");
              return;

          }
          else
          {
              showEvents(explore[0], "sec2");
              return;
          }
          let response = await fetch("/search/" + query + "?option=0");
          let data = await response.json();
          console.log(data);
          showEvents(data,"sec1");
      }, 500));

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

    }
    else if (page == "browse")
    {
	    await getClubs("null");

        let search = document.getElementById("search-input");
        let categories = document.getElementById("categories");
        let u = localStorage.getItem("user");
        u = JSON.parse(u);


        // search.addEventListener('input', debounce(async function(event) {
        //     let query = event.target.value;
        //     document.getElementById("myClubs").innerHTML = "";

        //     if (query)
        //         {
        //             query = query.trim().toLowerCase();
        //         }
        //     else if (query == ""){
        //         showClubs(allClub,u);
        //         return;
        //     }
        //     console.log(query);
        //     let response = await fetch("/search/" + query + "?option=1");
        //     let data = await response.json();
        //     console.log(data);
        //     showClubs(data,u);
        // }, 500));



        all_interests.forEach(interest => {
            categories.innerHTML += `
            <option value="${interest}">${interest}</option>
            `;
        });

        categories.addEventListener("change", async function(){
            let category = categories.value == "All" ? "null" : categories.value.trim();

            await getClubs(category);

        });

        let forms = document.querySelectorAll("form");

        forms.forEach(form => {
            form.addEventListener("submit", async function(e)
        {
            e.preventDefault();
            const newUrl = url + "/follow";

            let res = await fetchHelper(newUrl, "POST", 
            JSON.stringify({userId: e.target.elements.userId.value, club_name: e.target.elements.club_name.value, 
                toggle: e.target.elements.toggle.value}));


            console.log("follow");
            console.log(res);

            localStorage.setItem("user", JSON.stringify(res[0]));

            window.location.href = url + "/browse";
        });
        });
    }
})

function addMyProfile() {
    const menus = document.querySelectorAll(".menuList");
    const user = JSON.parse(localStorage.getItem("user"));
    const club = JSON.parse(localStorage.getItem("club"));
    menus.forEach(menu => {
        if (user.is_club) {
            const el = document.createElement("li");
            el.classList.add("nav-item");
            el.innerHTML = `<a class="nav-link" href="${url + "/myprofile?clubId=" + club._id}">My Profile</a>`;
            menu.appendChild(el);
        }
    });
}

function onLoadHome() {
    addMyProfile();
    getMyFeed();
    getExplore();
};

function onLoadMyClubs() {
    addMyProfile();
    getMyClubs();
};

function onLoadProfile() {
    addMyProfile();
    getUpcomingForClubs();
    getAllForClubs();
};

function onLoadSavedEvents() {
    addMyProfile();
    getUpcomingSavedEvent();
    getAllSavedEvent();
}

function onLoadBrowse() {
    addMyProfile();
    // Muthanna did it.
}

function onLoadNotification() {
    addMyProfile();
    getNewNotification();
    getPreNotification();
};

function onLoadMyProfile() {
    addMyProfile();
    getUpcomingForMyClub();
    getAllForMyClub();
}

function onLoadSetting() {
    addMyProfile(); //TODO
    document.getElementById("sign-out").addEventListener("click", async e => {
        const [result, status] = await fetchHelper((url + "/logout"), "POST", "");
        if (status > 204) {
            alert(JSON.stringify(result.message));
            return 
        }
        window.location.replace(url);
    });
};
