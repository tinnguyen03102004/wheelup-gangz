# PRD: Language Toggle & Navbar Restructure

## 📋 Overview
Bổ sung tính năng chuyển đổi ngôn ngữ Việt/Anh và restructure navbar với logo động.

## 🎯 Goals
1. Cho phép user chuyển ngữ VI ↔ EN, mặc định tiếng Việt
2. Restructure navbar: menu trái, language toggle phải
3. Logo hero shrink vào header center khi scroll

## 👤 User Stories

### US-1: Chuyển ngôn ngữ
> Là một user, tôi muốn chuyển đổi giữa tiếng Việt và tiếng Anh để đọc nội dung phù hợp.

**Acceptance Criteria:**
- [ ] Toggle icon hiển thị góc phải navbar
- [ ] Click toggle -> chuyển ngôn ngữ ngay lập tức
- [ ] Lưu preference vào localStorage
- [ ] Khi reload, dùng ngôn ngữ đã lưu
- [ ] Mặc định: tiếng Việt

### US-2: Navbar restructure
> Là một user, tôi muốn thấy navbar đẹp hơn với logo xuất hiện khi scroll.

**Acceptance Criteria:**
- [ ] Ban đầu: navbar không có logo
- [ ] Menu links nằm bên TRÁI
- [ ] Language toggle nằm bên PHẢI
- [ ] Khi scroll xuống: logo hero shrink và animate vào CENTER của navbar
- [ ] Logo navbar có click link về top

## 🎨 UI Specifications

### Navbar Layout (Before Scroll)
```
[MENU LINKS]                    [VI/EN Toggle]
```

### Navbar Layout (After Scroll)
```
[MENU LINKS]    [LOGO (small)]    [VI/EN Toggle]
```

### Language Toggle Icon
- SVG icon đơn giản, phù hợp black/white theme
- Text "VI" hoặc "EN" kế bên icon
- Hover effect subtle

## 🔤 Text Translations

| Location | Vietnamese | English |
|----------|------------|---------|
| **Navbar** | Giới thiệu, Bộ sưu tập, Cửa hàng, Liên hệ | About, Gallery, Shop, Contact |
| **Hero** | CHẤT ĐẠP PHỐ | URBAN CYCLING CULTURE |
| **Hero Tagline** | Chúng tôi không chỉ đạp xe — chúng tôi sống với văn hóa | We don't just ride — we live the culture |
| **Hero CTA** | Khám phá | Discover |
| **About Title** | CHÚNG TÔI LÀ AI | WHO WE ARE |
| **About P1** | WHEELUP GANGZ không chỉ là thương hiệu. Chúng tôi là một phong trào. | WHEELUP GANGZ is more than a brand. We're a movement. |
| **About P2** | Sinh ra từ đường phố, xây dựng cho những ai sống và thở văn hóa xe đạp. | Born from the streets, built for those who live and breathe cycling culture. |
| **About P3** | Mỗi chuyến đi kể một câu chuyện. Mỗi bánh xe mang một di sản. | Every ride tells a story. Every wheel carries a legacy. |
| **Gallery Title** | BỘ SƯU TẬP | GALLERY |
| **Gallery CTA** | Theo dõi trên Instagram | Follow us on Instagram |
| **Shop Title** | MUA SẮM VĂN HÓA | SHOP THE CULTURE |
| **Shop Tab 1** | QUẦN ÁO | APPAREL |
| **Shop Tab 2** | TRANG SỨC | JEWELRY |
| **Shop Tab 3** | XE ĐẠP | BIKES |
| **Contact Title** | GIA NHẬP GANG | JOIN THE GANG |
| **Footer** | © 2026 WHEELUP GANGZ. Đã đăng ký bản quyền. | © 2026 WHEELUP GANGZ. All rights reserved. |

## 🛠 Technical Approach
- **i18n Solution:** JSON data object (không cần framework)
- **Storage:** localStorage key `wheelup_lang`
- **Animation:** CSS transitions + JS scroll listener
- **Icons:** Inline SVG

## ⚠️ Constraints
- Không thay đổi Loading screen text
- Phải hoạt động trên mobile
- Performance: không block render

## ✅ Success Metrics
- Toggle hoạt động instant (<100ms)
- Scroll animation mượt (60fps)
- localStorage persist across sessions
