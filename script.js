// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

// ================= SMOOTH SCROLL =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

        mobileMenu.classList.remove("active");
    });
});

// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
const submitBtn  = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if(contactForm){

    contactForm.addEventListener("submit", async function(e){

        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";

        const data = new FormData(contactForm);

        try{

            const response = await fetch(contactForm.action,{
                method:"POST",
                body:data,
                headers:{
                    Accept:"application/json"
                }
            });

            if(response.ok){

                formStatus.innerHTML =
                "✅ Message sent successfully. SHOAXLEGACY will contact you soon.";

                formStatus.style.color = "#00ff99";

                contactForm.reset();

            }else{

                formStatus.innerHTML =
                "❌ Failed to send message.";

                formStatus.style.color = "red";
            }

        }catch(error){

            formStatus.innerHTML =
            "❌ Network error. Please try again.";

            formStatus.style.color = "red";
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = "Send Inquiry";
    });
}
