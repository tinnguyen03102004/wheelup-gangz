document.addEventListener('DOMContentLoaded', function () {
    const shopToggle = document.querySelector('.shop-toggle');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const productGrids = document.querySelectorAll('.product-grid');
    const gridsContainer = document.querySelector('.product-grids');

    if (!shopToggle || toggleOptions.length === 0) return;

    let currentIndex = 0;
    shopToggle.setAttribute('data-active', '0');

    toggleOptions.forEach((option, index) => {
        option.addEventListener('click', function () {
            if (index === currentIndex) return;

            const direction = index > currentIndex ? 'next' : 'prev';
            const category = this.dataset.category;
            const prevIndex = currentIndex;
            currentIndex = index;

            // 1. Update toggle UI
            toggleOptions.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            shopToggle.setAttribute('data-active', index.toString());

            // 2. Handle Grid Transitions
            productGrids.forEach((grid, gIndex) => {
                // Remove all transit classes
                grid.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');

                if (grid.dataset.category === category) {
                    // This is the new grid coming in
                    const slideInClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
                    grid.classList.add('active', slideInClass);
                } else if (gIndex === prevIndex) {
                    // This is the old grid going out
                    const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
                    grid.classList.add(slideOutClass);
                }
            });
        });
    });
});
