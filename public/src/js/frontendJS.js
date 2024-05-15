const url = "http://127.0.0.1:8001";
let myFeed = [];
let explore = [];
const upcomingClub = [];
let allClub = [];
const allSavedEvent = [];
const upcomingSavedEvent= [];
const newNoti = [];
const previousNoti = [];
const browse = [];
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
				try
                {
                    return response.json();
                }catch(e)
                {
                    return [];
                }
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
        myFeed= [JSON.parse(data)];
        showEvents(myFeed[0], "sec1");
    }
    console.log("error", array);
};

async function getExplore() {
    const urlsub = url + `/home/explore?today=${Date.now()}`;

    const array = await fetchHelper(urlsub, "GET", "");
    let data =  JSON.stringify(array[0]);
    if ((array[1] >= 200) && (array[1] < 400)) {
        explore= [JSON.parse(data)];
        showEvents(explore[0], "sec2");
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

async function getBrowse(category) {
    const urlsub = url + `/browse/clubs?category=${category}`;


    const array = await fetchHelper(urlsub, "GET", "");
    console.log(array);
    if ((array[1] >= 200) && (array[1] < 400) && array[0]) {
        let data =  JSON.stringify(array[0]);
        allClub = [JSON.parse(data)];
        let user =localStorage.getItem('user');
        showClubs(allClub[0], JSON.parse(user));
    }
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

    eventList.forEach(event => {

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
    const clubs = document.getElementById("myClubs");
    console.log(User._id);
    clubs.innerHTML = "";

    clubList.forEach(club => {
        if (User.following.indexOf(club.name) != -1) {
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
        <input hidden name="userId" value="${User._id}"/>
        <input hidden name="toggle" value="${toggle_value}"/>
        <button class="btn btn-outline-primary follow-btn">${btn_txt}</button>
        </form>
      </div> `
      clubs.innerHTML += clubCard;
    })
}


async function updateUser()
{
    let u = localStorage.getItem('user');
    u = JSON.parse(u);
    console.log(u);

    let data = await fetchHelper(url + "/login","POST", JSON.stringify({email: u.email, password: u.password}));
    localStorage.setItem("user",JSON.stringify(data[0].user));
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

    let current_url = document.location.href;
    let page = "login";

    if (current_url.indexOf("/") !== -1)
        {
            current_url = current_url.split("/");
            page = current_url[current_url.length - 1].length > 0 ? current_url[current_url.length - 1]: "login";
        }


    let singInForm = document.getElementById("login");
    console.log(page);


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



        search.addEventListener('input', debounce(async function(event) {
            let query = event.target.value;
            document.getElementById("sec1").innerHTML = "";
    
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

    }
    else if (page == "browse")
    {
        await getBrowse("null");

        let search = document.getElementById("search-input");
        let categories = document.getElementById("categories");
        let u = localStorage.getItem("user");
        u = JSON.parse(u);


        search.addEventListener('input', debounce(async function(event) {
            let query = event.target.value;
            document.getElementById("myClubs").innerHTML = "";
    
            if (query)
                {
                    query = query.trim().toLowerCase();
                }
            else{
                showClubs(allClub,u);
                return;
            }
            console.log(query);
            let response = await fetch("/search/" + query + "?option=1");
            let data = await response.json();
            console.log(data);
            showClubs(data,u);
        }, 500));



        all_interests.forEach(interest => {
            categories.innerHTML += `
            <option value="${interest}">${interest}</option>
            `;
        });

        categories.addEventListener("change", async function(){
            let category = categories.value == "All" ? "null" : categories.value.trim();

            await getBrowse(category);

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


            localStorage.setItem("user", JSON.stringify(res[0]));

            window.location.href = url + "/browse";
        });
        });



        
    }




})
