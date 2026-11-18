// ========================================
// ErrorPages - Interactive JavaScript
// ========================================

(function() {
    'use strict';

    // ========================================
    // Page Load Animation
    // ========================================
    
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    });

    // ========================================
    // Search Functionality (404 Page)
    // ========================================
    
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        // Handle search submission
        const handleSearch = function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Show loading state
                searchButton.textContent = 'Searching...';
                searchButton.disabled = true;
                
                // Simulate search (in real app, this would be an actual search)
                setTimeout(function() {
                    // For demo purposes, redirect to homepage
                    // In production, implement actual search functionality
                    console.log('Searching for:', searchTerm);
                    
                    // Show feedback
                    searchButton.textContent = 'No results';
                    setTimeout(function() {
                        searchButton.textContent = 'Search';
                        searchButton.disabled = false;
                    }, 1500);
                }, 800);
            }
        };
        
        searchButton.addEventListener('click', handleSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(e);
            }
        });
        
        // Add input animation
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    }

    // ========================================
    // Interactive Elements Enhancement
    // ========================================
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            // Add ripple styles dynamically
            if (!document.getElementById('ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.5);
                        transform: scale(0);
                        animation: ripple-animation 0.6s ease-out;
                        pointer-events: none;
                    }
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });

    // ========================================
    // Keyboard Navigation Enhancement
    // ========================================
    
    // Improve keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to go back
        if (e.key === 'Escape') {
            const currentPath = window.location.pathname;
            if (currentPath.includes('404') || currentPath.includes('503')) {
                window.history.back();
            }
        }
        
        // Home key to go to homepage
        if (e.key === 'Home' && e.ctrlKey) {
            e.preventDefault();
            window.location.href = 'index.html';
        }
    });

    // ========================================
    // Error Code Animation Enhancement
    // ========================================
    
    const errorCodeNumbers = document.querySelectorAll('.error-code span');
    
    if (errorCodeNumbers.length > 0) {
        // Add hover effect to error code numbers
        errorCodeNumbers.forEach(number => {
            number.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            });
            
            number.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    // ========================================
    // Illustration Interaction
    // ========================================
    
    const illustration = document.querySelector('.error-illustration svg');
    
    if (illustration) {
        // Make illustration interactive
        illustration.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.5s ease-out';
        });
        
        illustration.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // ========================================
    // Parallax Effect for Background Elements
    // ========================================
    
    document.addEventListener('mousemove', function(e) {
        const floatingElements = document.querySelectorAll('[class*="float-"]');
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.02;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
            element.style.transition = 'transform 0.3s ease-out';
        });
    });

    // ========================================
    // Accessibility Announcements
    // ========================================
    
    // Create live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    
    // Announce page load
    setTimeout(function() {
        const pageTitle = document.querySelector('h1');
        if (pageTitle) {
            liveRegion.textContent = pageTitle.textContent + ' page loaded';
        }
    }, 1000);

    // ========================================
    // Try Again Button (503 Page)
    // ========================================
    
    const tryAgainButton = document.querySelector('.btn-primary[onclick*="reload"]');
    
    if (tryAgainButton) {
        tryAgainButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="animation: spin 1s linear infinite;">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="50" stroke-dashoffset="25" fill="none"/>
                </svg>
                Reloading...
            `;
            this.disabled = true;
            
            // Add spin animation
            if (!document.getElementById('spin-animation')) {
                const style = document.createElement('style');
                style.id = 'spin-animation';
                style.textContent = `
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Reload after short delay
            setTimeout(function() {
                location.reload();
            }, 800);
        });
    }

    // ========================================
    // Navigation Menu Interaction
    // ========================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // ========================================
    // Performance Monitoring
    // ========================================
    
    // Log page performance (useful for debugging)
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
            }, 0);
        });
    }

    // ========================================
    // Error Code Counter Animation
    // ========================================
    
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        document.querySelectorAll('.feature-card, .helpful-links, .info-box').forEach(element => {
            observer.observe(element);
        });
    }

    // ========================================
    // Console Easter Egg
    // ========================================
    
    console.log('%c🚀 ErrorPages', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cBuilt with care and attention to detail', 'font-size: 12px; color: #764ba2;');
    console.log('%cLike what you see? Check out the code!', 'font-size: 12px; color: #666;');

    // ========================================
    // Theme Toggle (Optional Enhancement)
    // ========================================
    
    // Check for system dark mode preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Dark mode detected, but using light theme for optimal visibility');
    }

    // ========================================
    // Service Worker Registration (Optional)
    // ========================================
    
    // Uncomment to add offline support
    /*
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registered:', registration.scope);
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed:', err);
                });
        });
    }
    */

})();
