// Initialize Lucide Icons
lucide.createIcons();

// Valve Easter Egg
console.log("%c Powered by Source Engine Logic ", "background: #000; color: #ff6b00; font-size: 20px; font-weight: bold; border: 2px solid #ff6b00; padding: 10px; border-radius: 5px;");
console.log("%c λ Welcome to Black Mesa Research Facility", "color: #a1a1aa; font-family: monospace; font-size: 12px;");

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });
});

// Project Gallery Logic
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-image').forEach(container => {
        const img = container.querySelector('img');
        const galleryData = container.getAttribute('data-gallery');
        const indicator = container.querySelector('.gallery-indicator');
        
        if (galleryData) {
            try {
                const images = JSON.parse(galleryData);
                let currentIndex = 0;

                // Debug log to confirm initialization
                console.log(`Gallery initialized for project. Found ${images.length} images.`);

                container.addEventListener('click', (e) => {
                    e.preventDefault(); // Stop default behavior
                    e.stopPropagation(); // Stop bubbling

                    // Prevent navigating if clicking on links/buttons inside (if any)
                    if (e.target.tagName === 'A') return;
                    
                    // Cycle to next image
                    currentIndex = (currentIndex + 1) % images.length;
                    
                    // Fade out
                    gsap.to(img, {
                        opacity: 0.5,
                        duration: 0.2,
                        onComplete: () => {
                            // Change source
                            img.src = images[currentIndex];
                            
                            // Update indicator
                            if (indicator) {
                                indicator.textContent = `${currentIndex + 1}/${images.length}`;
                            }
                            
                            // Fade in
                            gsap.to(img, {
                                opacity: 1,
                                duration: 0.2
                            });
                        }
                    });
                });
                
            } catch (e) {
                console.error('Error parsing gallery data:', e);
            }
        }
    });
});

document.addEventListener('mousedown', () => {
    gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1
    });
});

document.addEventListener('mouseup', () => {
    gsap.to(cursor, {
        scale: 1,
        duration: 0.1
    });
});

// Hover effects for links and buttons
const interactiveElements = document.querySelectorAll('a, button, .project-card, .cert-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 1.5,
            backgroundColor: 'rgba(255, 107, 0, 0.5)',
            duration: 0.3
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'rgba(255, 107, 0, 0.3)',
            duration: 0.3
        });
    });
});

// Hero Animation
const tl = gsap.timeline();

tl.from('.logo', {
    y: -50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
})
.from('.nav-links a', {
    y: -50,
    opacity: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power3.out'
}, '-=0.8')
.from('.greeting', {
    x: -50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
}, '-=0.8')
.from('.glitch-text', {
    scale: 0.9,
    opacity: 0,
    duration: 1.5,
    ease: 'elastic.out(1, 0.5)'
}, '-=0.5')
.from('.subtitle', {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
}, '-=1.0')
.from('.cta-buttons a', {
    y: 20,
    opacity: 0,
    stagger: 0.3,
    duration: 1.2,
    ease: 'power3.out'
}, '-=1.0')
.from('.hero-visual', {
    x: 50,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out'
}, '-=1.2');

// Scroll Animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        delay: i * 0.1, // Stagger effect
        duration: 0.8,
        ease: 'power3.out'
    });
});

gsap.utils.toArray('.skill-tags span').forEach((tag, i) => {
    gsap.from(tag, {
        scrollTrigger: {
            trigger: tag.closest('.skill-category'),
            start: 'top 85%',
        },
        scale: 0,
        opacity: 0,
        immediateRender: false,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)'
    });
});

gsap.utils.toArray('.stat-card').forEach((stat, i) => {
    gsap.from(stat, {
        scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        delay: i * 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// Glitch Text Effect (One-time run)
function triggerGlitch() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    const originalText = glitchText.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+";
    let iterations = 0;
    
    const interval = setInterval(() => {
        glitchText.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("");
        
        if(iterations >= originalText.length){ 
            clearInterval(interval);
            glitchText.innerText = originalText; // Ensure final text is clean
        }
        
        iterations += 1 / 3;
    }, 50); // Slightly slower glitch speed for better readability
}

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isVisible = navLinks.style.display === 'flex';
        
        if (!isVisible) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '2rem';
            
            gsap.fromTo(navLinks.children, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.3 }
            );
        } else {
            navLinks.style.display = 'none';
        }
    });
}
