document.addEventListener('DOMContentLoaded', function() {
    const rotatingTextElement = document.getElementById('rotatingText');
    const wordsWithColors = [
        { text: 'ideas', color: '#ff6b47' },
        { text: 'things', color: '#4ecdc4' },
        { text: 'products', color: '#45b7d1' },
        { text: 'solutions', color: '#96ceb4' },
        { text: 'experiences', color: '#feca57' },
        { text: 'innovations', color: '#ff9ff3' }
    ];
    let currentIndex = 0;

    function rotateText() {
        // Fade out
        rotatingTextElement.style.opacity = '0';
        
        setTimeout(() => {
            // Change text and color
            currentIndex = (currentIndex + 1) % wordsWithColors.length;
            rotatingTextElement.textContent = wordsWithColors[currentIndex].text;
            rotatingTextElement.style.color = wordsWithColors[currentIndex].color;
            
            // Fade in
            rotatingTextElement.style.opacity = '1';
        }, 300); // Faster transition
    }

    // Set initial text and color
    rotatingTextElement.textContent = wordsWithColors[0].text;
    rotatingTextElement.style.color = wordsWithColors[0].color;
    
    // Start continuous rotation every 2 seconds
    setInterval(rotateText, 2000);
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth horizontal scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
        }
    });
});

// Add subtle scroll animations (optional enhancement)
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.section-title, .description, .service-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize scroll animations after a short delay
setTimeout(handleScrollAnimations, 100);

// Hide left navigation when scrolling past hero section
function handleLeftNavVisibility() {
    const leftNav = document.querySelector('.left-nav');
    const hero = document.querySelector('.hero');
    
    if (!leftNav || !hero) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible, show left nav
                leftNav.style.opacity = '1';
                leftNav.style.visibility = 'visible';
            } else {
                // Hero is not visible, hide left nav
                leftNav.style.opacity = '0';
                leftNav.style.visibility = 'hidden';
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(hero);
}

// Initialize left nav visibility handler
setTimeout(handleLeftNavVisibility, 100);

// Scroll-aware HOME button for mobile
function handleScrollAwareHomeButton() {
    const homeLink = document.querySelector('.home-link');
    if (!homeLink) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHomeButton() {
        const currentScrollY = window.scrollY;
        
        // Only apply on mobile screens
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past 100px - hide button
                homeLink.classList.add('hidden');
            } else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
                // Scrolling up or near top - show button
                homeLink.classList.remove('hidden');
            }
        } else {
            // Desktop - always show and remove mobile classes
            homeLink.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHomeButton);
            ticking = true;
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Listen for resize events to handle orientation changes
    window.addEventListener('resize', () => {
        setTimeout(updateHomeButton, 100);
    });
    
    // Initial call
    updateHomeButton();
}

// Initialize scroll-aware home button
setTimeout(handleScrollAwareHomeButton, 100);
