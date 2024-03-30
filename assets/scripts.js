
// Cards Animation Initialization
// ==================================================================
function initCardAnimations() {
    let cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach(function(card, index) {
        setTimeout(function() {
            card.style.opacity = "1";
            card.style.transform = "translate3D(0, 0, 0)";
        }, 100 * index);
    });
}

// Parallax Effect Initialization
// ==================================================================
function initParallax() {
    document.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset;
        let parallaxSpeed = 0.3;
        let offset = scrollTop * parallaxSpeed;

        // For the parallax effect on the cover-image
        document.querySelector('.cover-image').style.transform = `translate3d(0, ${offset}px, 0)`;

        // For scaling down and moving the card
        let scaleAmount = 1 - (scrollTop / 1000);  // Adjust 1000 based on when you want the card to be minimized
        let moveAmount = scrollTop * 0.25;  // Adjust 0.3 to control the speed of the card falling down
        
        if(scaleAmount > 0.6) {  // Set a minimum scale limit
            document.querySelector('.place-info').style.transform = `translateY(${moveAmount}px) scale(${scaleAmount})`;
        }
    });
}

// Working Hours Checker Initialization
// ==================================================================
function updateBarStatus() {
    const currentStatus = document.querySelector('.current-status');
    const indicator = currentStatus.querySelector('.indicator');
    const timeText = currentStatus.querySelector('.body-1');

    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const openingTime = (currentDay === 0 || currentDay === 6) ? 14 : 13; // 11:00 AM on weekends, 10:00 AM otherwise
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

// Tabs Bar Initialization
// ==================================================================
function initTabsBar() {
    let isScrolling = false;
    
    // Function for smooth scrolling
    function smoothScroll(target) {
        isScrolling = true;
        const element = document.querySelector(target);
        const offset = 144;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
        });
    
        setTimeout(() => {
        isScrolling = false;
        }, 1000);  // Increase the timeout if needed
    }
    
    // Function to set the active tab and scroll it into view
    function setActiveTab(target) {
        const tabs = document.querySelectorAll('.tab-item');
        tabs.forEach(tab => tab.classList.remove('active'));
    
        const activeTab = document.querySelector(`[data-section="${target.substring(1)}"]`);
        activeTab.classList.add('active');
    
        const wrapper = document.querySelector('.tabs-wrapper');
        const scrollLeftPosition = activeTab.offsetLeft - (wrapper.offsetWidth / 2 - activeTab.offsetWidth / 2);
    
        wrapper.scrollTo({
        left: scrollLeftPosition,
        behavior: 'smooth'
        });
    }
    
    // Event listeners for tab items
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('data-section');
            smoothScroll(`#${target}`);
            setActiveTab(`#${target}`);
        });
        });

    // Scroll event listener
    document.addEventListener('scroll', function() {
        if (isScrolling) return;
    
        const sections = Array.from(document.querySelectorAll('.tab-item')).map(tab => tab.getAttribute('data-section'));
        let closestSection = null;
        let smallestDistance = Infinity;
    
        for (const section of sections) {
        const element = document.getElementById(section);
        const position = element.getBoundingClientRect();
        const distance = Math.abs(position.top);  // Distance from the top of the viewport
    
        // Check if the section is in the viewport
        if (position.top <= window.innerHeight && position.bottom >= 0) {
            if (distance < smallestDistance) {
            smallestDistance = distance;
            closestSection = section;
            }
        }
        }
    
        if (closestSection) {
        setActiveTab(`#${closestSection}`);
        }
    });
}

// Fix top bar at scroll
// ==================================================================
function toggleTopBar() {
    const topBar = document.querySelector('.page-top-bar');

    if (window.scrollY >= 316) {
        topBar.classList.add('fixed');
    } else {
        topBar.classList.remove('fixed');
    }
}


// AJAX Loading and Initialization
// ==================================================================
function loadContent(pageName, addToHistory = true) {
    fetch(`${pageName}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-container').innerHTML = data;
            attachEventListeners();
            setTimeout(() => {
                initAll(); // Re-initialize all functionalities
            }, 100);

            // Add to browser history
            if (addToHistory) {
                window.history.pushState({page: pageName}, "", `#${pageName}`);
            }

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        })
        .catch(error => console.error('Error fetching content:', error));
}

// Event Listener Attachment
// ==================================================================
function attachEventListeners() {
    window.addEventListener('scroll', toggleTopBar);
    // For nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetPage = this.getAttribute('data-target');
        loadContent(targetPage);
        });
    });

    // For the back button
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function(event) {
            event.preventDefault();
            loadContent('home');  // Load the main menu
        });
    }
}

// Initialize back button support
// ==================================================================
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        loadContent(event.state.page, false);
    }
});

// Initialize All Features and Event Listeners
// ==================================================================
function initAll() {
    initCardAnimations();
    initTabsBar();
    initParallax();
}

// On initial page load
// ==================================================================
document.addEventListener('DOMContentLoaded', () => {
    loadContent('home'); // Load the main menu initially
    attachEventListeners();
    initAll(); // Initialize all functionalities
    updateBarStatus();
    setInterval(updateBarStatus, 60000);
});

