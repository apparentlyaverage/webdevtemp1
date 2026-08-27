// ==========================================
// MOBILE NAVIGATION (slide-in sidebar)
// ==========================================

const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.getElementById('nav-links');
const navOverlay = document.getElementById('nav-overlay');

if (navToggle && navLinks && navOverlay) {

    function openNav() {
        navLinks.classList.add('open');
        navOverlay.classList.add('open');
        navToggle.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        document.body.style.overflow = 'hidden'; // stop the page scrolling behind the sidebar
    }

    function closeNav() {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('open');
        isOpen ? closeNav() : openNav();
    });

    if (navClose) {
        navClose.addEventListener('click', closeNav);
    }

    // Tapping the dimmed backdrop closes the sidebar
    navOverlay.addEventListener('click', closeNav);

    // Escape key closes it too, for keyboard users
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            closeNav();
        }
    });

    // Close automatically once a link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    // If the window is resized back up to desktop width while open, reset state
    window.addEventListener('resize', () => {
        if (window.innerWidth > 640 && navLinks.classList.contains('open')) {
            closeNav();
        }
    });
}

// ==========================================
// HERO IMAGE SELECTOR
// ==========================================

const heroBg = document.getElementById('hero-bg');
const selectorDots = document.querySelectorAll('.selector-dot');

// Loop through each dot and listen for a click
selectorDots.forEach(dot => {
    dot.addEventListener('click', function() {

        // 1. Get the image link hidden inside this specific dot's 'data-src' attribute
        const newImageLink = this.getAttribute('data-src');

        // 2. Briefly fade the main image out
        heroBg.style.opacity = 0.6;

        // 3. Swap the image and fade it back in after a tiny fraction of a second (150 milliseconds)
        setTimeout(() => {
            heroBg.src = newImageLink;
            heroBg.style.opacity = 1;
        }, 150);

        // 4. Update the dots (remove 'active' from all of them, then add it to the one you just clicked)
        selectorDots.forEach(d => d.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==========================================
// MENU REVEAL (hover + keyboard + touch)
// ==========================================
// Ingredients reveal on hover via CSS (:hover) and on keyboard focus via
// CSS (:focus-within) automatically, since .menu-trigger is a real <button>.
// This click handler adds a toggle on top of that so touchscreen users
// (who have no hover state) can tap an item open and closed too.

const menuTriggers = document.querySelectorAll('.menu-trigger');

menuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        const parentItem = this.parentElement;
        const isOpen = parentItem.classList.toggle('active');
        this.setAttribute('aria-expanded', String(isOpen));
    });
});

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            // Stop observing once it has animated in
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Grab ONLY the about section elements and observe them
const animatedElements = document.querySelectorAll('.slide-from-left, .slide-from-right');
animatedElements.forEach((el) => scrollObserver.observe(el));