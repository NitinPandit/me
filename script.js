// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
if (currentTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .skill-category, .highlight-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero subtitle (optional)
const subtitle = document.querySelector('.hero-subtitle');
const subtitleText = subtitle.textContent;
subtitle.textContent = '';

let i = 0;
function typeWriter() {
    if (i < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Profile Photo Slideshow
const profilePhotos = document.querySelectorAll('.profile-photo');
let currentPhotoIndex = 0;

function changeProfilePhoto() {
    // Remove active class from current photo
    profilePhotos[currentPhotoIndex].classList.remove('active');
    
    // Move to next photo
    currentPhotoIndex = (currentPhotoIndex + 1) % profilePhotos.length;
    
    // Add active class to new photo
    profilePhotos[currentPhotoIndex].classList.add('active');
}

// Change photo every 4 seconds
setInterval(changeProfilePhoto, 4000);

// Typing Code Animation for Hero Background
const codeLines = [
    'const developer = { name: "Nitin", role: "Solutions Consultant" };',
    'function innovate() {',
    '  return "Transform Ideas into Reality";',
    '}',
    '',
    'class TechLeader extends Professional {',
    '  async solve(problem) {',
    '    const solution = await this.analyze(problem);',
    '    return this.implement(solution);',
    '  }',
    '}',
    '',
    'import { AI, Cloud, Analytics } from "expertise";',
    'export default Innovation;',
    '',
    'if (challenge) {',
    '  const result = await overcome(challenge);',
    '}',
    '',
    '<Component>Success</Component>',
    '{ skills: ["AI", "BI", "Cloud"] }',
    'let vision = "Digital Transformation";',
    '',
    '// Building Solutions',
    '/* Innovation in Code */',
    '=> { ideas }',
    '  .map(transform)',
    '  .filter(validate)',
    '  .reduce(deliver)',
    '',
    'SELECT * FROM expertise WHERE impact > 0;',
    'console.log("Driving Change");',
    '',
    'try { innovate(); }',
    'catch { adapt(); }',
    '',
    'async function breakthrough() {',
    '  await nextLevel();',
    '}'
];

let currentLineIndex = 0;
let currentCharIndex = 0;
let typedContent = '';

function typeCode() {
    if (currentLineIndex < codeLines.length) {
        const currentLine = codeLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
            typedContent += currentLine.charAt(currentCharIndex);
            currentCharIndex++;
            
            // Update the hero::before content
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.setProperty('--typed-code', `"${typedContent.replace(/"/g, '\\"')}"`);
            }
            
            // Random typing speed between 30-80ms
            setTimeout(typeCode, Math.random() * 50 + 30);
        } else {
            // Move to next line
            typedContent += '\n';
            currentLineIndex++;
            currentCharIndex = 0;
            
            // Small pause between lines
            setTimeout(typeCode, 200);
        }
    } else {
        // Reset and start over after a pause
        setTimeout(() => {
            currentLineIndex = 0;
            currentCharIndex = 0;
            typedContent = '';
            typeCode();
        }, 3000);
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeCode, 1000);
});

