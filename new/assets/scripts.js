// Top bar fix at scroll

const topbar = document.querySelector('.page-top-bar');
window.addEventListener('scroll', function() {
    if (!topbar.classList.contains('fixed') && window.scrollY > 300) {
        topbar.classList.add('fixed');
    } 
    else if (window.scrollY <= 300) {
        topbar.classList.remove('fixed');
    }
});