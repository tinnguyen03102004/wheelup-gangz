---
description: Deploy to GitHub Pages - Push code and deploy website
---

# /deploy - Deploy to GitHub Pages

Workflow này giúp deploy website lên GitHub Pages một cách nhanh chóng.

## Prerequisites

- Git đã được cài đặt
- Repository đã được kết nối với GitHub remote
- GitHub Pages đã được enable trong Settings

## Quy Trình Deploy

### Step 1: Stage all changes
```bash
git add -A
```

### Step 2: Commit with message
```bash
git commit -m "deploy: [mô tả thay đổi]"
```

### Step 3: Push to GitHub
```bash
git push origin main
```

### Step 4: Verify deployment
- Đợi 1-2 phút để GitHub Pages build
- Truy cập: https://tinnguyen03102004.github.io/wheelup-gangz/
- Kiểm tra Console có lỗi không (F12)

## Quick Deploy (One Command)

Chạy tất cả trong một lệnh:
```bash
git add -A; git commit -m "deploy: update"; git push origin main
```

## Kiểm Tra Status

```bash
git status
git log -n 3 --oneline
```

## Rollback (Nếu có lỗi)

```bash
# Xem commits gần đây
git log --oneline -5

# Rollback về commit trước
git revert HEAD
git push origin main
```

## GitHub Pages Settings

Nếu chưa enable GitHub Pages:
1. Vào https://github.com/tinnguyen03102004/wheelup-gangz/settings/pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

## Troubleshooting

| Vấn đề | Giải pháp |
|--------|-----------|
| 404 Error | Đợi 2-3 phút để build xong |
| CSS không load | Kiểm tra paths (có thể cần base path) |
| JS error | Check Console, có thể CORS issue |
| Old version | Hard refresh Ctrl+F5 |
