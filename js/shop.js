/**
 * WHEELUP GANGZ - Shop Section
 * Category tab switching functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Category Tab Switching
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productGrids = document.querySelectorAll('.product-grid');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const category = this.dataset.category;

            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show corresponding grid
            productGrids.forEach(grid => {
                grid.classList.remove('active');
                if (grid.dataset.category === category) {
                    grid.classList.add('active');
                }
            });
        });
    });

    // Product card hover sound (optional enhancement)
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Add subtle scale animation that's already in CSS
        });
    });
});
