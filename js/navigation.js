/**
 * Navigation JavaScript for Canne Fumarie Verona
 * Contains functions for page navigation and highlighting current page
 */

/**
 * Shows the selected page and hides all others
 * @param {string} pageId - The ID of the page to show
 */
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        window.scrollTo(0, 0);

        // Close mobile menu if open
        closeMobileMenu();
    }

    // Highlight current page in navigation
    highlightCurrentPage(pageId);
}

/**
 * Highlights the current page in the navigation menu
 * @param {string} pageId - The ID of the current page
 */
function highlightCurrentPage(pageId) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links > li > a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current page link
    const currentPageLinks = document.querySelectorAll(`.nav-links a[onclick="showPage('${pageId}')"]`);
    currentPageLinks.forEach(link => {
        // If link is in dropdown, activate parent dropdown
        const parentLi = link.closest('li').closest('.dropdown');
        if (parentLi) {
            const dropdownToggle = parentLi.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.classList.add('active');
            }
        }

        link.classList.add('active');
    });
}

/**
 * Initialize navigation when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the current page from URL hash or default to home
    const currentPage = window.location.hash.substring(1) || 'home';
    
    // Initialize page based on URL or default
    if (document.getElementById(currentPage)) {
        showPage(currentPage);
    } else {
        showPage('home');
    }
    
    // Update URL hash when page changes
    window.addEventListener('hashchange', function() {
        const pageId = window.location.hash.substring(1);
        if (document.getElementById(pageId)) {
            showPage(pageId);
        }
    });
});