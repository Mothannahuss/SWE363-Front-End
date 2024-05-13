document.addEventListener("DOMContentLoaded", function()
{
    console.log("DOMContentLoaded");
    document.querySelector("#sec2tog").addEventListener("click", function(){
        let sec1 = document.querySelector("#sec1");
        let sec2 = document.querySelector("#sec2");
        let tag = document.querySelector("#sec1tog");
        tag.classList.remove("active");
        let tag1 = document.querySelector("#sec2tog");
        tag1.classList.add("active");

        sec1.hidden = true;
        sec2.hidden = false;

    })


    document.querySelector("#sec1tog").addEventListener("click", function(){
        let sec1 = document.querySelector("#sec1");
        let sec2 = document.querySelector("#sec2");
        let tag1 = document.querySelector("#sec1tog");
        let tag = document.querySelector("#sec2tog");
        tag.classList.remove("active");
        tag1.classList.add("active");
        sec1.hidden = false;
        sec2.hidden = true;

    })
})