document.addEventListener("DOMContentLoaded", function()
{
    let opts = document.querySelectorAll(".form-check-input");

    opts.forEach(opt => 
        opt.addEventListener("change", function(e)
        {
            if (e.target.checked)
            {
                this.style.backgroundColor = "#1B08DA";
            }
            else
            {
                this.style.backgroundColor = "white";
            }
        })
    );
})