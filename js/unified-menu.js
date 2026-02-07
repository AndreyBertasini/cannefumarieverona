/**
 * Unified Menu JavaScript for Canne Fumarie Verona
 * Handles both SPA navigation and traditional page navigation
 */

/**
 * Initialize the unified menu when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize SPA links
    initSpaLinks();
    
    // Initialize home link
    initHomeLink();
    
    // Highlight current page in navigation
    highlightCurrentPage();
    
    // Initialize mobile menu
    initMobileMenu();
});

/**
 * Initialize SPA links with click handlers
 */
function initSpaLinks() {
    const spaLinks = document.querySelectorAll('.spa-link');
    
    spaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageId = this.getAttribute('data-page');
            
            // Only use SPA navigation if we're on the index page
            if (isIndexPage()) {
                e.preventDefault();
                showPage(pageId);
                
                // Update URL hash
                window.location.hash = pageId;
            }
        });
    });
}

/**
 * Initialize home link with click handler
 */
function initHomeLink() {
    const homeLinks = document.querySelectorAll('.home-link');
    
    homeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only use SPA navigation if we're on the index page
            if (isIndexPage() && typeof showPage === 'function') {
                e.preventDefault();
                showPage('home');
                
                // Update URL hash
                window.location.hash = 'home';
            }
        });
    });
}

/**
 * Check if current page is index.html
 * @returns {boolean} True if current page is index.html
 */
function isIndexPage() {
    const path = window.location.pathname;
    return path.endsWith('index.html') || path.endsWith('/') || path.endsWith('\\');
}

/**
 * Highlight the current page in the navigation menu
 */
function highlightCurrentPage() {
    const navLinks = document.querySelectorAll('.nav-links a');

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Get current page path
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;
    
    // Find matching link and add active class
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href) {
            // For SPA links with hash
            if (currentHash && href.includes(currentHash)) {
                addActiveClass(link);
            }
            // For traditional page links
            else if (currentPath.endsWith(href) || 
                    (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('\\')))) {
                addActiveClass(link);
            }
        }
    });
    
    // If we're on index.html with a hash, highlight the corresponding SPA link
    if (isIndexPage() && currentHash) {
        const pageId = currentHash.substring(1);
        const spaLink = document.querySelector(`.spa-link[data-page="${pageId}"]`);
        
        if (spaLink) {
            addActiveClass(spaLink);
        }
    }
}

/**
 * Add active class to link and parent dropdowns
 * @param {Element} link - The link element to activate
 */
function addActiveClass(link) {
    // Add active class to link
    link.classList.add('active');
    
    // If link is in dropdown, activate parent dropdown
    const parentLi = link.closest('li');
    const parentDropdown = parentLi ? parentLi.closest('.dropdown') : null;
    
    if (parentDropdown) {
        const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.classList.add('active');
        }
    }
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    // Close menu when clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
    }
    
    // Toggle dropdowns on mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle click for mobile view
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                
                // Close other open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(item => {
                    if (item !== dropdown) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
        });
    });
    
    // Close mobile menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMobileMenu();
            
            // Reset any active dropdowns
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

/**
 * Toggle mobile menu open/closed
 */
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle && navMenu && menuOverlay) {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (menuToggle && navMenu && menuOverlay) {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}