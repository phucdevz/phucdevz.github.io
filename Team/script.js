document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initTeamCards();
    initExperienceBars();
    initTeamParticles();
    initFloatingGeometry();
    initTeamTitleAnimation();
    initSkillBars();
    initProjectCards();
    initProjectsAnimation();
    initContactForm();
    initParticles();
    initLoadingScreen();
});

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    const hoverElements = document.querySelectorAll('a, button, .team-card, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(0.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });
}

function initScrollAnimations() {
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
    
    const animatedElements = document.querySelectorAll('.team-card, .skill-bar, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initTeamCards() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach((card, index) => {
        const card3DContainer = card.querySelector('.card-3d-container');
        const avatar = card.querySelector('.member-avatar');
        const particles = card.querySelectorAll('.avatar-particle');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'perspective(1500px) rotateX(8deg) rotateY(8deg) scale(1.02)';
            card3DContainer.style.transform = 'rotateY(15deg) rotateX(5deg) translateZ(30px)';
            
            particles.forEach((particle, i) => {
                particle.style.animationPlayState = 'running';
                particle.style.opacity = '1';
            });
            
            card.style.filter = 'drop-shadow(0 0 30px rgba(0, 245, 255, 0.3))';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) scale(1)';
            card3DContainer.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
            
            particles.forEach(particle => {
                particle.style.animationPlayState = 'paused';
                particle.style.opacity = '0.3';
            });
            
            card.style.filter = 'none';
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            const translateZ = Math.abs(rotateX) + Math.abs(rotateY);
            
            card3DContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(${translateZ}px)`;
            
            if (avatar) {
                const avatarRotateX = rotateX * 0.5;
                const avatarRotateY = rotateY * 0.5;
                avatar.style.transform = `rotateX(${avatarRotateX}deg) rotateY(${avatarRotateY}deg) scale(1.05)`;
            }
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                        card.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(card);
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
    });
    
    initTeamStatsCounter();
}

function initTeamStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function initExperienceBars() {
    const experienceBars = document.querySelectorAll('.exp-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });
    
    experienceBars.forEach(bar => observer.observe(bar));
}

function initTeamParticles() {
    const particles = document.querySelectorAll('.team-particles .particle');
    
    particles.forEach((particle, index) => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
        
        particle.addEventListener('mouseenter', () => {
            particle.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.8)';
            particle.style.transform = 'scale(1.5)';
        });
        
        particle.addEventListener('mouseleave', () => {
            particle.style.boxShadow = 'none';
            particle.style.transform = 'scale(1)';
        });
    });
}

function initFloatingGeometry() {
    const geometries = document.querySelectorAll('.floating-geometry');
    
    geometries.forEach((geometry, index) => {
        setInterval(() => {
            const randomX = Math.random() * 30 - 15;
            const randomY = Math.random() * 30 - 15;
            const randomRotate = Math.random() * 360;
            
            geometry.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + index * 1000);
        
        geometry.addEventListener('mouseenter', () => {
            geometry.style.background = 'linear-gradient(45deg, rgba(0, 245, 255, 0.3), rgba(255, 0, 255, 0.3))';
            geometry.style.transform = 'scale(1.2)';
        });
        
        geometry.addEventListener('mouseleave', () => {
            geometry.style.background = 'linear-gradient(45deg, rgba(0, 245, 255, 0.1), rgba(255, 0, 255, 0.1))';
            geometry.style.transform = 'scale(1)';
        });
    });
}

function initTeamTitleAnimation() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(50px) rotateX(90deg)';
        
        setTimeout(() => {
            word.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
            word.style.opacity = '1';
            word.style.transform = 'translateY(0) rotateX(0deg)';
        }, index * 200);
        
        setInterval(() => {
            const randomFloat = Math.random() * 10 - 5;
            word.style.transform = `translateY(${randomFloat}px)`;
        }, 2000 + index * 500);
    });
}

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Đang gửi...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Đã gửi thành công!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00ff88)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    if (!particlesContainer) return;
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: ${Math.random() > 0.5 ? '#00f5ff' : '#ff00ff'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: float ${Math.random() * 20 + 10}s infinite linear;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
}

function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes, .particles');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes('Team')) {
                document.querySelector('#team').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (button.textContent.includes('Dự án')) {
                document.querySelector('#projects').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

function initResponsiveFeatures() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResponsiveChanges();
        }, 250);
    });
    
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            handleResponsiveChanges();
        }, 500);
    });
}

function handleResponsiveChanges() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 992;
    const isSmallMobile = window.innerWidth <= 480;
    
    const cube = document.querySelector('.cube');
    if (cube) {
        if (isSmallMobile) {
            cube.style.animationDuration = '15s';
        } else if (isMobile) {
            cube.style.animationDuration = '12s';
        } else {
            cube.style.animationDuration = '10s';
        }
    }
    
    const particles = document.querySelector('.particles');
    if (particles && isMobile) {
        particles.style.backgroundSize = '150px 150px';
    } else if (particles) {
        particles.style.backgroundSize = '200px 200px';
    }
    
    if (isMobile) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.remove('touch-device');
    }
}

function initTouchOptimizations() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    const touchElements = document.querySelectorAll('.team-card, .project-card, .btn');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initResponsiveFeatures();
    initTouchOptimizations();
    handleResponsiveChanges();
});

function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typingSpeed = 120; // milliseconds per character
    const pauseAtEnd = 2000; // pause at the end
    
    function typeCharacter() {
        if (i < originalText.length) {
            typingElement.textContent += originalText.charAt(i);
            i++;
            
            const delay = originalText.charAt(i - 1) === ' ' ? typingSpeed * 1.5 : typingSpeed;
            setTimeout(typeCharacter, delay);
        } else {
            setTimeout(() => {
                typingElement.classList.add('typing-complete');
            }, pauseAtEnd);
        }
    }
    
    setTimeout(typeCharacter, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initMemberModal();
});

function initMemberModal() {
    const modal = document.getElementById('memberModal');
    const closeBtn = document.querySelector('.modal-close');
    
    const memberData = {
        1: {
            name: 'Nguyễn Trường Phục',
            role: 'Tech Lead & Full-stack Developer',
            avatar: './images/banner_avt.png',
            description: 'Sinh viên năm 3 chuyên ngành c, đam mê phát triển web với JavaScript và React. Đã hoàn thành nhiều dự án học tập và tham gia các cuộc thi lập trình.',
            skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'MongoDB'],
            achievements: [
                { icon: 'fas fa-graduation-cap', text: 'Sinh viên năm 3 - Đại học UTH' },
                { icon: 'fas fa-code', text: '15+ Dự án học tập hoàn thành' },
                { icon: 'fas fa-trophy', text: 'Tham gia cuộc thi lập trình sinh viên' },
                { icon: 'fas fa-users', text: 'Leader của BugSlayer Team' }
            ],
            projects: [
                { name: 'E-commerce Website', description: 'Website thương mại điện tử với React và Node.js' },
                { name: 'Task Management App', description: 'Ứng dụng quản lý công việc với JavaScript' },
                { name: 'Weather Dashboard', description: 'Dashboard thời tiết với API integration' }
            ],
            contact: {
                email: 'phucdeeptry723@gmail.com',
                phone: '+84 777 768 214',
                location: 'TP. Hồ Chí Minh, Việt Nam'
            },
            github: 'https://github.com/phucdevz',
            website: 'https://phucdevz.github.io/'
        },
        2: {
            name: 'Lê Đức Anh',
            role: 'UI/UX Designer & Frontend Developer',
            avatar: './images/avatar_2.png',
            description: 'Sinh viên năm 3 chuyên ngành Công nghệ Thông tin, có niềm đam mê với UI/UX design và animation. Đã tạo ra nhiều sản phẩm thiết kế trong các môn học và dự án cá nhân.',
            skills: ['Figma', 'Adobe XD', 'CSS3', 'Animation', 'Photoshop', 'Illustrator'],
            achievements: [
                { icon: 'fas fa-graduation-cap', text: 'Sinh viên năm 3 - Đại học UTH' },
                { icon: 'fas fa-palette', text: '20+ Thiết kế UI/UX hoàn thành' },
                { icon: 'fas fa-mobile-alt', text: 'Chuyên về thiết kế mobile app' },
                { icon: 'fas fa-award', text: 'Giải thưởng thiết kế sinh viên' }
            ],
            projects: [
                { name: 'Mobile App Design', description: 'Thiết kế giao diện ứng dụng di động' },
                { name: 'Website Redesign', description: 'Thiết kế lại giao diện website' },
                { name: 'Brand Identity', description: 'Thiết kế bộ nhận diện thương hiệu' }
            ],
            contact: {
                email: 'duwcsanh.dev@gmail.com',
                phone: '+84 933 543 987',
                location: 'TP. Hồ Chí Minh, Việt Nam'
            },
            github: 'https://github.com/duwcsanh1710',
            website: 'https://duwcsanh1710.github.io/Personal-Website/home.html'
        },
        3: {
            name: 'Nguyễn Đức Lượng',
            role: 'Backend Developer & Database Specialist',
            avatar: './images/avatar_3.png',
            description: 'Sinh viên năm 3 chuyên ngành Công nghệ Thông tin, tập trung vào phát triển backend với Python và quản lý database. Đã xây dựng nhiều API trong các dự án học tập.',
            skills: ['Python', 'Django', 'PostgreSQL', 'MySQL', 'REST API', 'Git'],
            achievements: [
                { icon: 'fas fa-graduation-cap', text: 'c' },
                { icon: 'fas fa-server', text: '10+ API endpoints đã phát triển' },
                { icon: 'fas fa-database', text: 'Chuyên về quản lý database' },
                { icon: 'fas fa-code', text: 'Thành thạo Python và Django' }
            ],
            projects: [
                { name: 'Student Management API', description: 'API quản lý sinh viên với Django' },
                { name: 'E-commerce Backend', description: 'Backend cho website thương mại điện tử' },
                { name: 'Blog System', description: 'Hệ thống blog với Django và PostgreSQL' }
            ],
            contact: {
                email: '0902nguyenluong@gmail.com',
                phone: '+84 337 015 928',
                location: 'TP. Hồ Chí Minh, Việt Nam'
            },
            github: 'https://github.com/moi-nguyen',
            website: 'https://moi-nguyen.github.io/Profile/'
        },
        4: {
            name: 'Nguyễn Phạm Thiên Phước',
            role: 'DevOps Engineer & Cloud Specialist',
            avatar: './images/avatar_4.png',
            description: 'Sinh viên năm 3 chuyên ngành Công nghệ Thông tin, quan tâm đến DevOps và cloud computing. Đã học và thực hành với Docker, AWS trong các môn học và dự án.',
            skills: ['Docker', 'AWS', 'Kubernetes', 'Linux', 'CI/CD', 'Jenkins'],
            achievements: [
                { icon: 'fas fa-graduation-cap', text: 'Sinh viên năm 3 - Đại học UTH' },
                { icon: 'fas fa-cloud', text: 'Cloud Computing Learner' },
                { icon: 'fas fa-shield-alt', text: 'Quan tâm đến bảo mật hệ thống' },
                { icon: 'fas fa-cogs', text: 'Chuyên về automation và deployment' }
            ],
            projects: [
                { name: 'Docker Deployment', description: 'Triển khai ứng dụng với Docker' },
                { name: 'AWS Cloud Setup', description: 'Thiết lập infrastructure trên AWS' },
                { name: 'CI/CD Pipeline', description: 'Xây dựng pipeline tự động hóa' }
            ],
            contact: {
                email: 'nguyenphuoc.200595@gmail.com',
                phone: '+84 336 394 050',
                location: 'TP. Hồ Chí Minh, Việt Nam'
            },
            github: 'https://github.com/PhuocNguyencoder',
            website: 'https://phuocnguyencoder.github.io/-LapTrinhWeb/'
        },
        5: {
            name: 'Nguyễn Minh Huy',
            role: 'Mobile Developer & Cross-platform Specialist',
            avatar: './images/avatar_5.png',
            description: 'Sinh viên năm 3 chuyên ngành Công nghệ Thông tin, đam mê phát triển ứng dụng mobile. Đã tạo ra nhiều ứng dụng demo trong quá trình học tập với React Native và Flutter.',
            skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Mobile UI/UX'],
            achievements: [
                { icon: 'fas fa-graduation-cap', text: 'Sinh viên năm 3 - Đại học UTH' },
                { icon: 'fas fa-mobile-alt', text: '5+ Ứng dụng mobile đã phát triển' },
                { icon: 'fas fa-app-store', text: 'Chuyên về cross-platform development' },
                { icon: 'fas fa-code', text: 'Thành thạo React Native và Flutter' }
            ],
            projects: [
                { name: 'Todo Mobile App', description: 'Ứng dụng quản lý công việc với React Native' },
                { name: 'Weather App', description: 'Ứng dụng thời tiết với Flutter' },
                { name: 'Chat Application', description: 'Ứng dụng chat real-time' }
            ],
            contact: {
                email: 'huy012230@gmail.com',
                phone: '+84 567 890 123',
                location: 'TP. Hồ Chí Minh, Việt Nam'
            },
            github: 'https://github.com/minhuynnn',
            website: 'https://minhuynnn.github.io/Personalwebsite'
        }
    };
    
    const detailsLinks = document.querySelectorAll('.social-link.details');
    detailsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const memberId = parseInt(link.getAttribute('data-member'));
            openMemberModal(memberId, memberData[memberId]);
        });
    });
    
    closeBtn.addEventListener('click', closeMemberModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeMemberModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeMemberModal();
        }
    });
}

function openMemberModal(memberId, data) {
    const modal = document.getElementById('memberModal');
    
    document.getElementById('modalMemberName').textContent = data.name;
    document.getElementById('modalMemberRole').textContent = data.role;
    document.getElementById('modalMemberAvatar').src = data.avatar;
    document.getElementById('modalMemberDescription').textContent = data.description;
    document.getElementById('modalMemberEmail').textContent = data.contact.email;
    document.getElementById('modalMemberPhone').textContent = data.contact.phone;
    document.getElementById('modalMemberLocation').textContent = data.contact.location;
    document.getElementById('modalMemberGithub').href = data.github;
    document.getElementById('modalMemberWebsite').href = data.website;
    
    const skillsContainer = document.getElementById('modalMemberSkills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'modal-skill-item';
        skillElement.textContent = skill;
        skillsContainer.appendChild(skillElement);
    });
    
    const achievementsContainer = document.getElementById('modalMemberAchievements');
    achievementsContainer.innerHTML = '';
    data.achievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'modal-achievement-item';
        achievementElement.innerHTML = `
            <i class="${achievement.icon}"></i>
            <span>${achievement.text}</span>
        `;
        achievementsContainer.appendChild(achievementElement);
    });
    
    const projectsContainer = document.getElementById('modalMemberProjects');
    projectsContainer.innerHTML = '';
    data.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'modal-project-item';
        projectElement.innerHTML = `
            <h4>${project.name}</h4>
            <p>${project.description}</p>
        `;
        projectsContainer.appendChild(projectElement);
    });
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
    const modal = document.getElementById('memberModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initProjectsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                        card.classList.add('animate-in');
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(card);
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.boxShadow = '0 25px 70px rgba(0, 245, 255, 0.3)';
            
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.background = 'rgba(255, 255, 255, 0.4)';
            }
            
            const featureItems = card.querySelectorAll('.feature-item');
            featureItems.forEach((item, i) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(15px)';
                    item.style.background = 'rgba(255, 255, 255, 0.15)';
                }, i * 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
            
            const icon = card.querySelector('.project-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.background = 'rgba(255, 255, 255, 0.2)';
            }
            
            const featureItems = card.querySelectorAll('.feature-item');
            featureItems.forEach(item => {
                item.style.transform = 'translateX(0)';
                item.style.background = 'rgba(255, 255, 255, 0.05)';
            });
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            
            const banner = card.querySelector('.project-banner');
            if (banner) {
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                banner.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
            
            const banner = card.querySelector('.project-banner');
            if (banner) {
                banner.style.backgroundPosition = 'center center';
            }
        });
    });
    
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function addTypingSound() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playTypingSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    const originalTypingEffect = initTypingEffect;
    initTypingEffect = function() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        const originalText = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typingSpeed = 120;
        const pauseAtEnd = 2000;
        
        function typeCharacter() {
            if (i < originalText.length) {
                typingElement.textContent += originalText.charAt(i);
                
                if (originalText.charAt(i) !== ' ') {
                    playTypingSound();
                }
                
                i++;
                const delay = originalText.charAt(i - 1) === ' ' ? typingSpeed * 1.5 : typingSpeed;
                setTimeout(typeCharacter, delay);
            } else {
                setTimeout(() => {
                    typingElement.classList.add('typing-complete');
                }, pauseAtEnd);
            }
        }
        
        setTimeout(typeCharacter, 1500);
    };
}

document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.addEventListener('mouseenter', () => {
        bar.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
    });
    
    bar.addEventListener('mouseleave', () => {
        bar.style.boxShadow = 'none';
    });
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

