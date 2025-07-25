// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation and Buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Close mobile nav if it's open
            // If you implement a mobile hamburger menu, add logic here to close it
        });
    });

    // Sticky Navigation Bar
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - navbar.offsetHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        highlightNavLink();
    });

    // Function to highlight active navigation link
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        let currentActive = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50; // Adjust offset for sticky header
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    }

    // Initial call to set active link and handle sticky nav on page load
    highlightNavLink();
    window.dispatchEvent(new Event('scroll')); // Trigger scroll event on load for sticky nav and initial active link

    // Fade-in Animation on Scroll
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Percentage of the target element which is currently visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial check for sections already in viewport on page load
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            section.classList.add('visible');
        }
    });

    // Handle Contact Form Submission (Basic example, needs backend for real functionality)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            // In a real application, you would send this data to a server
            this.reset(); // Clear the form
        });
    }
});
