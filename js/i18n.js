/**
 * WHEELUP GANGZ - Internationalization (i18n)
 * Language Toggle: Vietnamese (default) / English
 */

// =============================================
// TRANSLATIONS DATA
// =============================================

const translations = {
    vi: {
        // Navbar
        nav_about: "Giới thiệu",
        nav_gallery: "Bộ sưu tập",
        nav_shop: "Cửa hàng",
        nav_contact: "Liên hệ",

        // Hero Section
        hero_slogan: "CHẤT ĐẠP PHỐ",
        hero_tagline: "Chúng tôi không chỉ đạp xe — chúng tôi sống với văn hóa",
        hero_cta: "Khám phá",
        hero_scroll: "Cuộn",

        // About Section
        about_title: "CHÚNG TÔI LÀ AI",
        about_p1: '<span class="highlight">WHEELUP GANGZ</span> không chỉ là thương hiệu. Chúng tôi là một phong trào.',
        about_p2: "Sinh ra từ đường phố, xây dựng cho những ai sống và thở văn hóa xe đạp.",
        about_p3: "Mỗi chuyến đi kể một câu chuyện. Mỗi bánh xe mang một di sản.",

        // Gallery Section
        gallery_title: "BỘ SƯU TẬP",
        gallery_cta: "Theo dõi trên Instagram",

        // Shop Section
        shop_title: "MUA SẮM VĂN HÓA",
        shop_tab_apparel: "QUẦN ÁO",
        shop_tab_jewelry: "TRANG SỨC",
        shop_tab_bikes: "XE ĐẠP",

        // Product names
        product_hoodie: "Hoodie Đặc Trưng",
        product_hoodie_desc: "Logo chrome, in hình BMX rider",
        product_tee: "Áo Urban",
        product_tee_desc: "Dáng rộng, in kim loại",
        product_joggers: "Quần Rider",
        product_joggers_desc: "Vải tech, sọc phản quang",
        product_chain: "Dây Chuyền Bánh Răng",
        product_chain_desc: "Mắt xích Cuban chrome, mặt bánh răng",
        product_rings: "Nhẫn Bánh Xe",
        product_rings_desc: "Bộ bạc, họa tiết nan hoa",
        product_bracelet: "Vòng Tay Xích",
        product_bracelet_desc: "Thiết kế mắt xích xe đạp",
        product_bmx: "Street BMX",
        product_bmx_desc: "Đen mờ, peg freestyle",
        product_fixie: "Urban Fixie",
        product_fixie_desc: "Một số, vành sâu",
        product_cruiser: "Classic Cruiser",
        product_cruiser_desc: "Chắn bùn chrome, lốp bóng",

        // Contact Section
        contact_title: "GIA NHẬP GANG",
        footer_copyright: "© 2026 WHEELUP GANGZ. Đã đăng ký bản quyền."
    },

    en: {
        // Navbar
        nav_about: "About",
        nav_gallery: "Gallery",
        nav_shop: "Shop",
        nav_contact: "Contact",

        // Hero Section
        hero_slogan: "URBAN CYCLING CULTURE",
        hero_tagline: "We don't just ride — we live the culture",
        hero_cta: "Discover",
        hero_scroll: "Scroll",

        // About Section
        about_title: "WHO WE ARE",
        about_p1: '<span class="highlight">WHEELUP GANGZ</span> is more than a brand. We\'re a movement.',
        about_p2: "Born from the streets, built for those who live and breathe cycling culture.",
        about_p3: "Every ride tells a story. Every wheel carries a legacy.",

        // Gallery Section
        gallery_title: "GALLERY",
        gallery_cta: "Follow us on Instagram",

        // Shop Section
        shop_title: "SHOP THE CULTURE",
        shop_tab_apparel: "APPAREL",
        shop_tab_jewelry: "JEWELRY",
        shop_tab_bikes: "BIKES",

        // Product names
        product_hoodie: "Signature Hoodie",
        product_hoodie_desc: "Chrome logo, BMX rider print",
        product_tee: "Urban Tee",
        product_tee_desc: "Oversized fit, metallic print",
        product_joggers: "Rider Joggers",
        product_joggers_desc: "Tech fabric, reflective stripes",
        product_chain: "Gear Chain",
        product_chain_desc: "Chrome Cuban link, gear pendant",
        product_rings: "Wheel Rings",
        product_rings_desc: "Silver set, spoke pattern",
        product_bracelet: "Chain Bracelet",
        product_bracelet_desc: "Bike link design, toggle clasp",
        product_bmx: "Street BMX",
        product_bmx_desc: "Matte black, freestyle pegs",
        product_fixie: "Urban Fixie",
        product_fixie_desc: "Single-speed, deep-dish wheels",
        product_cruiser: "Classic Cruiser",
        product_cruiser_desc: "Chrome fenders, balloon tires",

        // Contact Section
        contact_title: "JOIN THE GANG",
        footer_copyright: "© 2026 WHEELUP GANGZ. All rights reserved."
    }
};

// =============================================
// I18N CORE FUNCTIONS
// =============================================

const STORAGE_KEY = 'wheelup_lang';
let currentLang = 'en'; // Default English

/**
 * Get saved language from localStorage or return default
 */
function getSavedLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'vi' ? 'vi' : 'en';
}

/**
 * Save language preference to localStorage
 */
function saveLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
}

/**
 * Apply translations to all elements with data-i18n attribute
 */
function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translations[lang][key];

        if (translation) {
            // Check if contains HTML (like <span class="highlight">)
            if (translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle button text
    updateToggleDisplay(lang);
}

/**
 * Update the language toggle button display
 */
function updateToggleDisplay(lang) {
    const toggleText = document.querySelector('.lang-toggle-text');
    if (toggleText) {
        toggleText.textContent = lang.toUpperCase();
    }

    // Update active state
    const toggle = document.querySelector('.lang-toggle');
    if (toggle) {
        toggle.setAttribute('data-lang', lang);
    }
}

/**
 * Toggle between VI and EN
 */
function toggleLanguage() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    saveLanguage(currentLang);
    applyTranslations(currentLang);
}

/**
 * Initialize i18n system
 */
function initI18n() {
    currentLang = getSavedLanguage();
    applyTranslations(currentLang);

    // Setup toggle click handler
    const toggleBtn = document.querySelector('.lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleLanguage);
    }

    console.log(`🌐 i18n initialized: ${currentLang.toUpperCase()}`);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initI18n);

// Export for external use
window.i18n = {
    toggle: toggleLanguage,
    setLang: (lang) => {
        if (lang === 'vi' || lang === 'en') {
            currentLang = lang;
            saveLanguage(lang);
            applyTranslations(lang);
        }
    },
    getLang: () => currentLang
};
