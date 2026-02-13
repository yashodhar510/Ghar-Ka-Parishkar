// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ===================================
// STICKY HEADER ON SCROLL
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// TABS FUNCTIONALITY
// ===================================
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ===================================
// ACCORDION FUNCTIONALITY
// ===================================
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        // Close all accordion items
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ===================================
// TESTIMONIAL CAROUSEL
// ===================================
const testimonialTrack = document.getElementById('testimonialTrack');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
let autoPlayInterval;

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const slideWidth = testimonialTrack.querySelector('.carousel-slide').offsetWidth;
    testimonialTrack.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

    // Update dots
    carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
}

// Dot navigation
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
    });
});

// Auto-play carousel
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % carouselDots.length;
        goToSlide(currentSlide);
    }, 5000);
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

if (testimonialTrack) {
    startAutoPlay();
}

// Pause auto-play on hover
if (testimonialTrack) {
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    testimonialTrack.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" or empty
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
        }
    });
});

// ===================================
// FORM VALIDATION
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
            alert('Thank you for subscribing! You will receive our newsletter soon.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .blog-card, .video-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===================================
// VIDEO CARD CLICK HANDLERS
// ===================================
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoTitle = card.querySelector('.video-title').textContent;
        alert(`Video player would open here: ${videoTitle}\n\nIn production, this would open a modal or redirect to the video page.`);
    });
});

// ===================================
// RESPONSIVE CAROUSEL ADJUSTMENT
// ===================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (testimonialTrack) {
            goToSlide(currentSlide);
        }
    }, 250);
});

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Set active nav link on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ===================================
// ADMIN BUTTON INJECTION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are already in admin folder to correct path or hide it
    if (window.location.pathname.includes('/admin/')) {
        return;
    }

    // Create button element
    const adminBtn = document.createElement('a');
    adminBtn.href = '/admin/index.html'; // Path to admin login
    adminBtn.innerHTML = '<i class="fas fa-user-shield"></i>';

    // Style the button
    Object.assign(adminBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#333', // Dark background
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: '9999',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        fontSize: '1.2rem'
    });

    // Hover effect
    adminBtn.addEventListener('mouseenter', () => {
        adminBtn.style.transform = 'scale(1.1)';
        adminBtn.style.backgroundColor = '#000';
    });

    adminBtn.addEventListener('mouseleave', () => {
        adminBtn.style.transform = 'scale(1)';
        adminBtn.style.backgroundColor = '#333';
    });

    // Append to body
    document.body.appendChild(adminBtn);
});

// ===================================
// CONTACT FORM HANDLING (LocalStorage)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values using explicit IDs
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value;
            const city = document.getElementById('contact-city').value;
            const service = document.getElementById('contact-service').value;
            const message = document.getElementById('contact-message').value;

            const formData = {
                id: Date.now(),
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                name: name || 'N/A',
                email: email || 'N/A',
                phone: phone || 'N/A',
                city: city || 'N/A',
                service: service || 'N/A',
                message: message || 'N/A',
                paymentStatus: 'Pending'
            };

            // Save to LocalStorage
            const existingMessages = JSON.parse(localStorage.getItem('mhc_contact_messages') || '[]');
            existingMessages.unshift(formData);
            localStorage.setItem('mhc_contact_messages', JSON.stringify(existingMessages));

            // Feedback
            alert('Thank you! Your message has been sent to the admin dashboard.');
            contactForm.reset();
        });
    }
});
