// Enhanced Portfolio Website JavaScript
class PortfolioApp {
    constructor() {
        this.currentSection = 'home';
        this.isAnimating = false;
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.initNavigation();
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initFormInteractions();
        this.initMouseEffects();
        this.initSkillBars();
        this.initProjectCards();
        this.initFloatingElements();
        this.initTypewriterEffect();
        this.initLanguageBars();
        this.optimizePerformance();
    }

    createParticles() {
    const particlesContainer = document.getElementById('particles');
        const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.3;
        particlesContainer.appendChild(particle);
    }
}

    initNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.section');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                this.switchSection(targetId);
            });
        });

        window.addEventListener('scroll', () => {
            if (this.isAnimating) return;
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            if (current && current !== this.currentSection) {
                this.updateActiveNav(current);
            }
        });
    }

    switchSection(sectionId) {
        if (this.isAnimating || sectionId === this.currentSection) return;
        
        this.isAnimating = true;
        this.currentSection = sectionId;

        // Smooth scroll to target section
        const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        
        this.isAnimating = false;
    }

    showSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
        }
    }

    updateActiveNav(sectionId) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    }

    initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    if (entry.target.closest('#skills')) {
                        this.animateSkillBars();
                    }
            }
        });
    }, observerOptions);

        const animatedElements = document.querySelectorAll('.stat-card, .project-card, .skill-category, .contact-item, .about-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    initParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const orbs = document.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.1;
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
}

    initFormInteractions() {
    const formInputs = document.querySelectorAll('.form-input');
        
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

            input.addEventListener('input', function() {
                this.style.borderColor = this.value ? '#10b981' : '';
        });
    });

        const form = document.querySelector('.contact-form');
        if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    handleFormSubmission(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    }

    initMouseEffects() {
        const heroCard = document.querySelector('.hero-card');
        const character3D = document.querySelector('.character-3d');
        
        if (heroCard) {
            heroCard.addEventListener('mousemove', (e) => {
                const rect = heroCard.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                
                if (character3D) {
                    character3D.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            heroCard.addEventListener('mouseleave', () => {
                if (character3D) {
                    character3D.style.transform = 'translate(0, 0)';
                }
            });
        }
    }

    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.getAttribute('data-width') + '%';
                bar.style.width = targetWidth;
                bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                    bar.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)';
                    setTimeout(() => {
                        bar.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
                    }, 1000);
                }, 2000);
            }, index * 300);
        });
    }

    initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    // 3D Character Animation
    initCharacter3D() {
        const character = document.querySelector('.character-3d');
        if (!character) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });
        
        const animate = () => {
            targetX += (mouseX - targetX) * 0.1;
            targetY += (mouseY - targetY) * 0.1;
            
            character.style.transform = `rotateY(${targetX * 10}deg) rotateX(${targetY * 10}deg)`;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initFloatingElements() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            const randomDelay = Math.random() * 4;
            const randomDuration = Math.random() * 2 + 3;
            
            icon.style.animationDelay = `${randomDelay}s`;
            icon.style.animationDuration = `${randomDuration}s`;
        });
    }

    initTypewriterEffect() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const text = typewriterElement.getAttribute('data-text') || 'Xin chào,';
        const speed = 80; 
        let index = 0;

        typewriterElement.textContent = '';
        typewriterElement.classList.remove('typing-complete', 'typing');

        const typeWriter = () => {
            if (index < text.length) {
                const char = text.charAt(index);
                typewriterElement.textContent += char;
                index++;
                
                this.addTypewriterEffect(typewriterElement, char);
                
                const randomDelay = speed + Math.random() * 30;
                setTimeout(typeWriter, randomDelay);
            } else {
                typewriterElement.classList.add('typing-complete');
                this.addCompletionEffect(typewriterElement);
            }
        };

        setTimeout(typeWriter, 1000);
    }

    addTypewriterEffect(element, char) {
        element.style.textShadow = `0 0 20px var(--accent-primary), 0 0 40px var(--accent-primary)`;
        setTimeout(() => {
            element.style.textShadow = '0 0 10px var(--accent-primary)';
        }, 100);

        if (char === ' ' || char === ',') {
            element.style.transform = 'translateX(1px)';
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
            }, 50);
        }
    }

    addCompletionEffect(element) {
        element.style.textShadow = `0 0 30px var(--accent-primary), 0 0 60px var(--accent-primary)`;
        
        setTimeout(() => {
            element.style.textShadow = '0 0 10px var(--accent-primary)';
        }, 1000);
    }


    restartTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        typewriterElement.textContent = '';
        typewriterElement.classList.remove('typing-complete', 'typing');
        
        setTimeout(() => {
            this.initTypewriterEffect();
        }, 300);
    }

    initLanguageBars() {
        const languageBars = document.querySelectorAll('.language-progress');
        
        const animateLanguageBars = () => {
            languageBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width + '%';
                }
            });
        };
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateLanguageBars, 200);
                }
            });
        });
        
        const languagesSection = document.querySelector('.languages-section');
        if (languagesSection) {
            observer.observe(languagesSection);
        }
    }

    initLanguageBars() {
        const languageBars = document.querySelectorAll('.language-progress');
        
        const animateLanguageBars = () => {
            languageBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.width = width + '%';
                }
            });
        };
        
        // Animate on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateLanguageBars, 200);
                }
            });
        });
        
        const languagesSection = document.querySelector('.languages-section');
        if (languagesSection) {
            observer.observe(languagesSection);
        }
    }

    optimizePerformance() {
        let scrollTimeout;
    window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                
            }, 16); // ~60fps
        });

        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
            }
        });
    });

        images.forEach(img => imageObserver.observe(img));
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    document.body.classList.add('loaded');
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});

function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.addEventListener('click', (e) => {
    if (e.target.matches('.btn-primary, .btn-secondary, .submit-btn')) {
        createRippleEffect(e);
    }
});

const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);