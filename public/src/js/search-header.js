document.addEventListener("DOMContentLoaded", function () {


    let url = window.location.href.split("/");
    let page = url[url.length - 1];
    let option = page == "browse" ? "1":"0";
    const backBtn = document.getElementById("back-btn");
    const searchBtn = document.getElementById("search-btn");
    const head1 = document.getElementById("header1");
    const head2 = document.getElementById("header2");
    const searchField = document.getElementById("search-input");
    let user = JSON.parse(localStorage.getItem("user"));
    let club_cards = option == "1" ? document.querySelectorAll(".club-card"):null;
    

    backBtn.addEventListener("click", () => {
        head1.removeAttribute("hidden");
        head2.setAttribute("hidden", "");
    });

    searchBtn.addEventListener("click", () => {
        head1.setAttribute("hidden", "");
        head2.removeAttribute("hidden");
        let content = document.createElement("div");
        content.id = "searchedContent";
        document.body.appendChild(content);
        console.log(club_cards)
        if (club_cards)
            {
                club_cards.forEach(card=>card.remove());
            }
    });


    


    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    searchField.addEventListener('input', debounce(async function(event) {
        let query = event.target.value;
        document.querySelector("#searchedContent").innerHTML = "";

        if (query)
            {
                query = query.trim().toLowerCase();
            }
        else{
            return;
        }
        console.log(query);
        let response = await fetch("/search/" + query + "?option=" + option);
        let data = await response.json();
        showEvents(data, option);
    }, 500));


    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g, 
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }




    function showEvents(data, option) {
        let container = document.getElementById("searchedContent");
        container.innerHTML = "";
        if (option == "0")
            {
                data.forEach(event => {
                    let content = `<div class="event-card">
                    <div class="event-avatar"></div>
                    <div class="event-content">
                      <div class="event-details">
                        <a class="event-club" href="profile.html">${toTitleCase(event.club_name)}</a>
                        <h2 class="event-title">${toTitleCase(event.title)}</h2>
                        <div class="event-info">
                          <p><i class="fas fa-calendar-alt"></i>${event.date}</p>
                          <p><i class="fas fa-clock"></i> Time</p>
                          <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        </div>
                      </div>
                      <a class="view-event-btn" href="eventDetails.html">View Event</a>
                    </div>
                  </div>`
                  container.innerHTML += content;
                });
            }
        else
        {
            data.forEach(club => {
                const found = followed.find(c => c.toLowerCase() == club.name)
                let content = `      <div class="club-card">
                <div class="event-avatar"></div>
                <div class="club-detail">
                  <h2><a href="/">${toTitleCase(club.name)}</a></h2>
                  <p>${club.bio}</p>
                </div>`

                if (found)
                    {
                        content +=
                        `<form action="/follow" method="post">
                        <input hidden name="club_name" value="${ toTitleCase(club.name) }"/>
                        <input hidden name="userId" value="${ user._id }"/>
                        <input hidden name="toggle" value="1"/>
                        <button class="btn btn-outline-primary follow-btn">Unfollow</button>
                        </form>`;
                    }
                else
                {
                    content +=
                        `<form action="/follow" method="post">
                        <input hidden name="club_name" value="${ club.name }"/>
                        <input hidden name="userId" value="${ user._id }"/>
                        <input hidden name="toggle" value="0"/>
                        <button class="btn btn-outline-primary follow-btn">Unfollow</button>
                        </form>`;
                }

              container.innerHTML += content;
            });
        }
    }


    // searchField.addEventListener("change", async function()
    // {
    //     let query = searchField.innerText.toLowerCase();
    //     console.log(query);
    //     let res = await fetch("/search/" + query);
    //     let data = res.json();

    //     console.log(data);
        
    // })
});
