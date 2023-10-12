document.addEventListener('DOMContentLoaded', function() {

// Header animations

// Update function to handle animations
function update() {
    let scrollTop = window.pageYOffset;
    let parallaxSpeed = 0.5;
    let offset = scrollTop * parallaxSpeed;

    // For the parallax effect on the cover-image
    document.querySelector('.cover-image').style.transform = `translateY(${offset}px)`;

    // For scaling down and moving the place-card
    let scaleAmount = 1 - (scrollTop / 1000);
    let moveAmount = scrollTop * 0.3;
    
    if(scaleAmount > 0.5) {
        document.querySelector('.place-card').style.transform = `translateY(${moveAmount}px) scale(${scaleAmount})`;
    }
}

// Call the update function initially
update();

// Attach the scroll event
document.addEventListener("scroll", function() {
    requestAnimationFrame(update);
});


// Working hours checker

    function updateBarStatus() {
        const currentStatus = document.querySelector('.current-status');
        const indicator = currentStatus.querySelector('.indicator');
        const timeText = currentStatus.querySelector('.body-1');

        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        const openingTime = (currentDay === 0 || currentDay === 6) ? 11 : 10; // 11:00 AM on weekends, 10:00 AM otherwise
        const closingTime = 23; // 11:00 PM
        const lastHour = closingTime - 1; // 10:00 PM

        if (currentHour >= openingTime && currentHour < lastHour) {
            indicator.className = 'indicator open';
            timeText.textContent = `Сьогодні до ${closingTime}:00`;
        } else if (currentHour === lastHour) {
            if (currentMinute <= 15) {
            indicator.className = 'indicator last-hour';
            timeText.textContent = 'Ще годинку';
            } else if (currentMinute > 45) {
            indicator.className = 'indicator last-hour';
            timeText.textContent = 'Останній шанс';
            } else {
            indicator.className = 'indicator last-hour';
            timeText.textContent = 'Замиваємось';
            }
        } else {
            indicator.className = 'indicator close';
            timeText.textContent = 'Зараз зачинено';
        }
    }

    updateBarStatus();
    setInterval(updateBarStatus, 60000);


// Top bar fix at scroll

    function toggleTopBar() {
        const topBar = document.querySelector('.page-top-bar');

        if (window.scrollY >= 340) {
            topBar.classList.add('fixed');
        } else {
            topBar.classList.remove('fixed');
        }
    }


// Go back button

    const backButton = document.querySelector('.action-back');
    backButton.addEventListener('click', function() {
        window.history.back();
    });

    window.addEventListener('scroll', toggleTopBar);


// Init

    updateBarStatus();
    toggleTopBar();
});