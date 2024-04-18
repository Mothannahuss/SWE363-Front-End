document.addEventListener("DOMContentLoaded", function()
{
    document.querySelector("#about").addEventListener("click", function()
    {
        let div = document.querySelector("#contentHolder");
        let card = document.createElement("div");
        card.className = "event-card";
        card.innerText = "This club does this and that";
        div.innerHTML = "";
        div.appendChild(card);
    });



    document.querySelector("#upcoming").addEventListener("click", function()
    {
        let div = document.querySelector("#contentHolder");
        div.innerHTML = `      <div class="event-card">
        <div class="event-avatar"></div>
        <div class="event-content">
            <div class="event-details">
                <p class="event-club">Club Name</p>

                <h2 class="event-title">Club Name</h2>
                <div class="event-info">
                    <p><i class="fas fa-calendar-alt"></i> Day, Date</p>
                    <p><i class="fas fa-clock"></i> Time</p>
                    <p><i class="fas fa-map-marker-alt"></i> Location</p>
                </div>
            </div>
            <button class="view-event-btn">View Event</button>
        </div>
    </div>

    <div class="event-card">
      <div class="event-avatar"></div>
      <div class="event-content">
          <div class="event-details">
              <p class="event-club">Club Name</p>

              <h2 class="event-title">Club Name</h2>
              <div class="event-info">
                  <p><i class="fas fa-calendar-alt"></i> Day, Date</p>
                  <p><i class="fas fa-clock"></i> Time</p>
                  <p><i class="fas fa-map-marker-alt"></i> Location</p>
              </div>
          </div>
          <button class="view-event-btn">View Event</button>
      </div>
  </div>`;
    })


    document.querySelector("#all").addEventListener("click", function()
    {
        let div = document.querySelector("#contentHolder");
        div.innerHTML = `      <div class="event-card">
        <div class="event-avatar"></div>
        <div class="event-content">
            <div class="event-details">
                <p class="event-club">Club Name</p>

                <h2 class="event-title">Club Name</h2>
                <div class="event-info">
                    <p><i class="fas fa-calendar-alt"></i> Day, Date</p>
                    <p><i class="fas fa-clock"></i> Time</p>
                    <p><i class="fas fa-map-marker-alt"></i> Location</p>
                </div>
            </div>
            <button class="view-event-btn">View Event</button>
        </div>
    </div>

    <div class="event-card">
      <div class="event-avatar"></div>
      <div class="event-content">
          <div class="event-details">
              <p class="event-club">Club Name</p>

              <h2 class="event-title">Club Name</h2>
              <div class="event-info">
                  <p><i class="fas fa-calendar-alt"></i> Day, Date</p>
                  <p><i class="fas fa-clock"></i> Time</p>
                  <p><i class="fas fa-map-marker-alt"></i> Location</p>
              </div>
          </div>
          <button class="view-event-btn">View Event</button>
      </div>
  </div>`;
    })


})