// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize video functionality
    initializeVideo();

    // Initialize analytics chart
    initializeAnalyticsChart();
    
    // Initialize feature showcase
    initializeFeatureShowcase();

    // Initialize interactive tabs
    initializeTabs();

    // Add smooth scrolling for navigation
    addSmoothScrolling();

    // Add interactive effects
    addInteractiveEffects();

    // Initialize mobile menu
    initializeMobileMenu();
});

function initializeVideo() {
    const video = document.querySelector('.hero-video-container video');
    const placeholder = document.querySelector('.video-placeholder');
    const playButton = document.querySelector('.play-button');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    if (!video) return;

    // Handle video loading
    video.addEventListener('loadeddata', function() {
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    });

    // Handle video error - show placeholder
    video.addEventListener('error', function() {
        if (placeholder) {
            placeholder.style.display = 'flex';
        }
    });

    // Handle placeholder play button click
    if (playButton) {
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                if (placeholder) {
                    placeholder.style.display = 'none';
                }
            }
        });
    }

    // Handle overlay play/pause button
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '⏸️';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶️';
            }
        });
    }

    // Handle fullscreen button
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }

    // Update play/pause button based on video state
    video.addEventListener('play', function() {
        if (playPauseBtn) playPauseBtn.textContent = '⏸️';
    });

    video.addEventListener('pause', function() {
        if (playPauseBtn) playPauseBtn.textContent = '▶️';
    });

    // Add hover effects to video container
    const videoContainer = document.querySelector('.hero-video-container');
    if (videoContainer) {
        videoContainer.addEventListener('mouseenter', function() {
            video.style.transform = 'scale(1.02)';
            video.style.transition = 'transform 0.3s ease';
        });

        videoContainer.addEventListener('mouseleave', function() {
            video.style.transform = 'scale(1)';
        });
    }
}

function initializeAnalyticsChart() {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth * 2;
    const height = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Create a simple line chart visualization
    const data = [
        { month: 'Jan', revenue: 65000, forecast: 70000 },
        { month: 'Feb', revenue: 78000, forecast: 82000 },
        { month: 'Mar', revenue: 85000, forecast: 88000 },
        { month: 'Apr', revenue: 92000, forecast: 95000 },
        { month: 'May', revenue: 88000, forecast: 92000 },
        { month: 'Jun', revenue: 95000, forecast: 98000 }
    ];

    const chartWidth = canvas.offsetWidth - 80;
    const chartHeight = canvas.offsetHeight - 80;
    const startX = 40;
    const startY = 40;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Draw grid lines
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = startY + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + chartWidth, y);
        ctx.stroke();
    }

    // Draw revenue line
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 3;
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = startX + (chartWidth / (data.length - 1)) * index;
        const y = startY + chartHeight - (point.revenue / 100000) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw forecast line
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = startX + (chartWidth / (data.length - 1)) * index;
        const y = startY + chartHeight - (point.forecast / 100000) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw data points
    data.forEach((point, index) => {
        const x = startX + (chartWidth / (data.length - 1)) * index;
        const revenueY = startY + chartHeight - (point.revenue / 100000) * chartHeight;
        const forecastY = startY + chartHeight - (point.forecast / 100000) * chartHeight;

        // Revenue points
        ctx.fillStyle = '#ff6b35';
        ctx.beginPath();
        ctx.arc(x, revenueY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Forecast points
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.arc(x, forecastY, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    // Add labels
    ctx.fillStyle = '#888';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    data.forEach((point, index) => {
        const x = startX + (chartWidth / (data.length - 1)) * index;
        ctx.fillText(point.month, x, startY + chartHeight + 20);
    });
}

function initializeFeatureShowcase() {
    const featureItems = document.querySelectorAll('.feature-showcase-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
            const image = this.querySelector('.feature-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            const image = this.querySelector('.feature-image');
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            }
        });
    });
}

function initializeTabs() {
    const tabs = document.querySelectorAll('.preview-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });
}

function addSmoothScrolling() {
    // Add smooth scrolling to any anchor links
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
}

function addInteractiveEffects() {
    // Add hover effects to navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add hover effects to calculation items
    const calcItems = document.querySelectorAll('.calc-item');
    calcItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#2a2a2a';
            this.style.borderRadius = '6px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Add hover effects to company logos
    const logoItems = document.querySelectorAll('.logo-item');
    logoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#ffffff';
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '#666';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
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
    
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-video-container, .one-home-section, .analytics-section, .trusted-section, .footer');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

