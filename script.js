// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Enhanced Navbar with bohemian animations
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(240, 244, 236, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(107, 142, 35, 0.15)';
    } else {
        navbar.style.background = 'rgba(240, 244, 236, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(107, 142, 35, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .timeline-item, .prize-card, .eligibility-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroPoster = document.querySelector('.hero-poster');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add hover effect to cards with 3D transform
const cards = document.querySelectorAll('.about-card, .prize-card, .eligibility-item');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Animated counter for prize amounts
const animateValue = (element, start, end, duration) => {
    const startTimestamp = Date.now();
    const step = () => {
        const timestamp = Date.now();
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString() + '만원';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const prizeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const prizeText = entry.target.textContent;
            const prizeAmount = prizeText.replace(/[^0-9]/g, '');
            if (prizeAmount) {
                animateValue(entry.target, 0, parseInt(prizeAmount), 2000);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.prize-amount').forEach(amount => {
    prizeObserver.observe(amount);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(240, 244, 236, 0.98);
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(107, 142, 35, 0.15);
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    /* Enhanced card animations */
    .about-card, .prize-card, .eligibility-item {
        transition: all 0.3s ease-out !important;
    }
    
    /* Floating leaves animation */
    .floating-leaf {
        position: fixed;
        font-size: 2rem;
        opacity: 0.3;
        animation: floatLeaf 15s infinite linear;
        pointer-events: none;
        z-index: 999;
    }
    
    @keyframes floatLeaf {
        0% {
            transform: translateY(-100px) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Add floating leaves effect
function createFloatingLeaf() {
    const leaves = ['🌿', '🌱', '🍃'];
    const leaf = document.createElement('div');
    leaf.className = 'floating-leaf';
    leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
    leaf.style.left = Math.random() * window.innerWidth + 'px';
    leaf.style.animationDuration = (Math.random() * 10 + 10) + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(leaf);
    
    setTimeout(() => {
        leaf.remove();
    }, 20000);
}

// Create floating leaves periodically
setInterval(createFloatingLeaf, 5000);

// Add countdown timer for application deadline with bohemian style
const deadline = new Date('2025-07-15T23:59:59').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = deadline - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        const countdownElement = document.querySelector('.countdown');
        if (countdownElement) {
            countdownElement.innerHTML = `🌿 신청 마감까지 ${days}일 ${hours}시간 ${minutes}분 🌿`;
            countdownElement.style.animation = 'pulse 2s ease-in-out infinite';
        }
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Add smooth reveal animation for sections
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.05 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    sectionObserver.observe(section);
});