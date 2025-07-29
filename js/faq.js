/**
 * FAQ JavaScript for Canne Fumarie Verona
 * Contains functions for FAQ search functionality
 */

/**
 * Set up FAQ search functionality
 */
function setupFaqSearch() {
    const searchInput = document.getElementById('faq-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const questionItems = document.querySelectorAll('.faq-question-item');

            questionItems.forEach(item => {
                const questionText = item.textContent.toLowerCase();
                if (questionText.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide categories based on visible questions
            const categories = document.querySelectorAll('.faq-category');
            categories.forEach(category => {
                const visibleQuestions = category.querySelectorAll('.faq-question-item[style=""]').length;
                if (visibleQuestions === 0) {
                    category.style.display = 'none';
                } else {
                    category.style.display = '';
                }
            });
        });
    }
}

/**
 * Initialize FAQ functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    setupFaqSearch();
    
    // Add event listeners to FAQ question items for tracking
    const faqQuestionItems = document.querySelectorAll('.faq-question-item a');
    faqQuestionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Track FAQ question click (could be used for analytics)
            const questionText = this.textContent;
            console.log('FAQ question clicked:', questionText);
        });
    });
});