document.addEventListener("DOMContentLoaded", function()
{
    document.querySelector("#back-btn").addEventListener("click", function()
    {
        console.log("Search");
        history.back();
    })
})