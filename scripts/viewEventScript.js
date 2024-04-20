document.addEventListener("DOMContentLoaded", function()
{
    let buttons = document.querySelectorAll(".view-event-btn");

    buttons.forEach(btn => btn.addEventListener("click", function(){ window.location.href= "../html/eventDetails.html"}));
})