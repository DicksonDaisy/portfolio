/**
 * PORTFOLIO JAVASCRIPT
 * This file handles all interactive elements of the portfolio,
 * including navigation effects, mobile menu, active link highlighting, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* 
       1. STICKY HEADER EFFECT
       Changes the header appearance when the user scrolls down.
    */
    const header = document.querySelector('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll);


    /* 
       2. MOBILE MENU TOGGLE
       Handles opening and closing of the mobile navigation menu.
    */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const bars = document.querySelectorAll('.bar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            // Toggle visibility of the nav links
            navLinks.classList.toggle('active');
            
            // Basic styling for active mobile menu (injected via JS for simplicity)
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#fff';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid #e5e7eb';
                navLinks.style.zIndex = '999';
            } else {
                navLinks.style.display = '';
            }
        });
    }


    /* 
       3. ACTIVE NAVIGATION LINK HIGHLIGHTING
       Highlights the nav link corresponding to the current scroll position.
    */
    const updateActiveNavLink = () => {
        const navItems = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if section is in viewport
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Remove active class from all nav links
        navItems.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to the current section's nav link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    };

    // Initial call to set active link on page load
    updateActiveNavLink();


    /* 
       4. SMOOTH SCROLLING
       Ensures that clicking navigation links scrolls smoothly to the target section.
    */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navLinks.style.display = '';
                }

                // Scroll to the element with an offset for the sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link after smooth scroll
                setTimeout(() => {
                    updateActiveNavLink();
                }, 100);
            }
        });
    });


    /* 
       5. REVEAL ON SCROLL ANIMATION
       Uses the Intersection Observer API to fade in elements as they enter the viewport.
    */
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset to trigger earlier/later
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Once revealed, we don't need to observe it anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Prepare elements for animation
    const animateElements = [
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.feature-item'),
        ...document.querySelectorAll('.skill-tag'),
        ...document.querySelectorAll('.exp-item')
    ];

    animateElements.forEach(el => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add a helper class to trigger the animation
        el.classList.add('to-reveal');
        revealObserver.observe(el);
    });

    // Define the revealed state in CSS via a style tag for easy implementation
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio scripts initialized successfully.');
});