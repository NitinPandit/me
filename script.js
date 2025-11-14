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

// MVP Badge Celebration Effect
const mvpBadges = document.querySelectorAll('.mvp-badge');

mvpBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function(e) {
        createConfetti(this);
    });
});

function createConfetti(badge) {
    const confettiSymbols = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🏆', '👏'];
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
    
    // Create 12 confetti particles
    for (let i = 0; i < 12; i++) {
        const confetti = document.createElement('span');
        confetti.textContent = confettiSymbols[Math.floor(Math.random() * confettiSymbols.length)];
        confetti.style.position = 'absolute';
        confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 80 + Math.random() * 40;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 30;
        const rotation = Math.random() * 360;
        
        confetti.style.animation = `confettiFly${i} 1s ease-out forwards`;
        
        // Add keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confettiFly${i} {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(0.3);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rotation}deg) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        badge.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
            style.remove();
        }, 1000);
    }
}

// Fetch and Display Latest Articles from RSS Feed
async function fetchLatestArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    const rssUrl = 'https://www.c-sharpcorner.com/members/nitin-pandit/rss';
    
    // Determine article count based on screen size
    const isMobile = window.innerWidth <= 768;
    const articleCount = isMobile ? 6 : 9;
    
    try {
        // Try multiple CORS proxies for better reliability
        const proxies = [
            `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
            `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`,
            `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`
        ];
        
        let data = null;
        let isRss2Json = false;
        
        // Try first proxy (RSS2JSON)
        try {
            const response = await fetch(proxies[0]);
            const jsonData = await response.json();
            if (jsonData.status === 'ok' && jsonData.items) {
                data = jsonData.items.slice(0, articleCount);
                isRss2Json = true;
            }
        } catch (e) {
            console.log('RSS2JSON failed, trying alternative...');
        }
        
        // If first proxy failed, try allorigins
        if (!data) {
            try {
                const response = await fetch(proxies[1]);
                const jsonData = await response.json();
                const parser = new DOMParser();
                const xml = parser.parseFromString(jsonData.contents, 'text/xml');
                const items = xml.querySelectorAll('item');
                
                if (items.length > 0) {
                    data = Array.from(items).slice(0, articleCount);
                    isRss2Json = false;
                }
            } catch (e) {
                console.log('AllOrigins failed, trying corsproxy...');
            }
        }
        
        // If both failed, try corsproxy
        if (!data) {
            const response = await fetch(proxies[2]);
            const text = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, 'text/xml');
            const items = xml.querySelectorAll('item');
            
            if (items.length > 0) {
                data = Array.from(items).slice(0, articleCount);
                isRss2Json = false;
            }
        }
        
        if (!data || data.length === 0) {
            throw new Error('No articles found');
        }
        
        // Clear loading message
        articlesGrid.innerHTML = '';
        
        // Process articles based on format
        data.forEach(item => {
            let title, description, link, pubDate;
            
            if (isRss2Json) {
                // RSS2JSON format
                title = item.title;
                description = item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
                link = item.link;
                pubDate = new Date(item.pubDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
            } else {
                // XML format
                title = item.querySelector('title').textContent;
                description = item.querySelector('description').textContent.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
                link = item.querySelector('link').textContent;
                const dateText = item.querySelector('pubDate').textContent;
                pubDate = new Date(dateText).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                });
            }
            
            // Ensure link is absolute
            const articleUrl = link.startsWith('http') ? link : `https://www.c-sharpcorner.com${link}`;
            
            // Create article card
            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';
            articleCard.innerHTML = `
                <div class="article-header">
                    <h3 class="article-title">${title}</h3>
                </div>
                <div class="article-body">
                    <p class="article-description">${description}</p>
                    <div class="article-footer">
                        <span class="article-date">
                            <i class="fas fa-calendar-alt"></i> ${pubDate}
                        </span>
                        <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="article-link">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `;
            
            articlesGrid.appendChild(articleCard);
        });
        
    } catch (error) {
        console.error('Error fetching articles:', error);
        articlesGrid.innerHTML = `
            <div class="article-loading">
                <i class="fas fa-exclamation-circle"></i>
                <p>Unable to load articles at this time. Please visit <a href="https://www.c-sharpcorner.com/members/nitin-pandit/articles" target="_blank" style="color: var(--primary-color); text-decoration: underline;">my C# Corner profile</a> to see all articles.</p>
            </div>
        `;
    }
}

// Load articles when page loads
window.addEventListener('load', () => {
    fetchLatestArticles();
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
