// 1. Smooth Scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// 2. Form Submission Handling
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending...";
        
        const data = new FormData(e.target);
        
        try {
            const response = await fetch(e.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.innerHTML = "✅ Success! SHOAXLEGACY will contact you shortly.";
                formStatus.style.color = "#00ff00";
                contactForm.reset();
            } else {
                formStatus.innerHTML = "❌ Error sending message. Please try again.";
                formStatus.style.color = "red";
            }
        } catch (error) {
            formStatus.innerHTML = "❌ Network error. Check your connection.";
            formStatus.style.color = "red";
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Inquiry";
        }
    });
}

function updateMarketHours() {
    const now = new Date();
    const gmtHour = now.getUTCHours();
    
    // Session times in GMT
    const sessions = [
        { id: 'london-session', open: 8, close: 16 },
        { id: 'newyork-session', open: 13, close: 21 },
        { id: 'tokyo-session', open: 0, close: 8 },
        { id: 'sydney-session', open: 22, close: 6 }
    ];

    sessions.forEach(session => {
        const element = document.getElementById(session.id);
        const indicator = element.querySelector('.status-indicator');
        const text = element.querySelector('.status-text');
        
        let isOpen = false;
        
        // Handle Sydney/Tokyo crossover midnight
        if (session.open > session.close) {
            if (gmtHour >= session.open || gmtHour < session.close) isOpen = true;
        } else {
            if (gmtHour >= session.open && gmtHour < session.close) isOpen = true;
        }

        if (isOpen) {
            indicator.className = 'status-indicator open';
            text.innerHTML = "Open";
            text.style.color = "#00ff00";
        } else {
            indicator.className = 'status-indicator closed';
            text.innerHTML = "Closed";
            text.style.color = "#ff0000";
        }
    });
}

// Run immediately and update every minute
updateMarketHours();
setInterval(updateMarketHours, 60000);