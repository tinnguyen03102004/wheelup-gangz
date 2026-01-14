/**
 * WHEELUP GANGZ - Shop Section
 * Toggle slider category switching functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Toggle option switching
    const shopToggle = document.querySelector('.shop-toggle');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const productGrids = document.querySelectorAll('.product-grid');

    if (!shopToggle || toggleOptions.length === 0) return;

    // Set initial state
    shopToggle.setAttribute('data-active', '0');

    toggleOptions.forEach((option, index) => {
        option.addEventListener('click', function () {
            const category = this.dataset.category;

            // Update active option
            toggleOptions.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Move slider
            shopToggle.setAttribute('data-active', index.toString());

            // Show corresponding grid - CSS handles smooth transition
            productGrids.forEach(grid => {
                if (grid.dataset.category === category) {
                    grid.classList.add('active');
                } else {
                    grid.classList.remove('active');
                }
            });
        });
    });

    // Product card hover effects (already in CSS)
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add subtle scale animation that's already in CSS
        });
    });
});
