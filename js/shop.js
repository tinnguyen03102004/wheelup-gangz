document.addEventListener('DOMContentLoaded', function () {
    const shopToggle = document.querySelector('.shop-toggle');
    const toggleOptions = document.querySelectorAll('.toggle-option');
    const productGrids = document.querySelectorAll('.product-grid');
    const gridsWrapper = document.querySelector('.product-grids-wrapper');

    if (!shopToggle || toggleOptions.length === 0 || !gridsWrapper) return;

    // Set initial active state correctly
    productGrids[0].classList.add('active');

    toggleOptions.forEach((option, index) => {
        option.addEventListener('click', function () {
            // 1. Update toggle UI
            toggleOptions.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            shopToggle.setAttribute('data-active', index.toString());

            // 2. Slide the grids wrapper (The Sliding Pill Effect)
            const offset = index * -33.333;
            gridsWrapper.style.transform = `translateX(${offset}%)`;

            // 3. Update active grid for styling (blur/opacity)
            productGrids.forEach((grid, gIndex) => {
                if (gIndex === index) {
                    grid.classList.add('active');
                } else {
                    grid.classList.remove('active');
                }
            });
        });
    });
});
