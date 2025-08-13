/* ---------------------------
   Navbar: Mobile Menu Toggle
---------------------------- */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
}

/* Optional: Close menu when a link is clicked (mobile friendly) */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

/* ---------------------------
   Smooth Scroll for Nav Links
---------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---------------------------
   Scroll Animations Trigger
---------------------------- */
const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-in, .animate-up');

function handleScrollAnimation() {
    const triggerBottom = window.innerHeight * 0.85;

    animatedElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
            el.style.opacity = 1;
            el.style.transform = 'translate(0,0)';
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);

/* Initial trigger for elements already in view */
handleScrollAnimation();
