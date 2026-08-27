// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
    // 1. Toggle open/close when clicking the hamburger button
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents click conflicts with the document listener below
        
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
        
        const isOpen = navLinks.classList.contains('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // 2. Close automatically when tapping a link inside the sidebar
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 3. Close automatically if the user clicks outside the sidebar
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
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