# WANJOU LEE — PORTFOLIO

景觀設計師李宛柔的作品集網站，使用 HTML、CSS、JavaScript 構建，可部署於 GitHub Pages。

## 功能

- 📖 27 頁作品集逐頁瀏覽
- ⌨️ 鍵盤導航（← 上一頁、→ 下一頁）
- 📱 響應式設計，適配各裝置
- ⚡ 輕量級，無外部依賴
- 🌐 可直接部署於 GitHub Pages

## 專案結構

```
portfolio/
├── index.html              # 主頁面
├── assets/
│   ├── css/
│   │   └── style.css       # 全站樣式
│   ├── js/
│   │   └── main.js         # 互動邏輯
│   └── pages/
│       ├── page-01.jpg
│       ├── page-02.jpg
│       └── ... (27 頁)
├── README.md               # 本檔案
└── .gitignore             # Git 忽略規則
```

## 快速開始

### 本地執行

1. 克隆或下載此專案
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. 用本地伺服器開啟（推薦 Python）
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

3. 在瀏覽器打開 `http://localhost:8000`

### 部署到 GitHub Pages

#### 方案 A：從 main 分支根目錄部署

1. 在 GitHub 建立新倉庫，命名為 `portfolio`
2. 將本地檔案推送到 GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

3. 進入倉庫的 **Settings → Pages**
4. **Source** 選擇 `Deploy from a branch`
5. **Branch** 選擇 `main` 和 `/ (root)`
6. 按下 **Save**

網站將在 `https://your-username.github.io/portfolio` 上線。

#### 方案 B：自訂域名部署

如果有自己的域名，可在 GitHub Pages 設定中加入自訂域名，網站將在你的域名上線。

## 使用方式

### 頁面導航

- **上/下按鈕** — 點擊瀏覽前後頁
- **鍵盤快捷鍵** — 使用左右方向鍵快速切換
- **頁碼指示** — 隨時查看目前位置

### 修改聯絡資訊

編輯 `index.html` 的 Contact 區段：
```html
<p><strong>Email:</strong> <a href="mailto:your-email@example.com">your-email@example.com</a></p>
<p><strong>Phone:</strong> 0800-XXXXXX</p>
```

### 更新作品內容

1. 用 PDF 轉檔工具或截圖軟體建立新的作品頁面圖片
2. 將圖片存為 `page-01.jpg`, `page-02.jpg` 等格式
3. 放入 `assets/pages/` 資料夾
4. 修改 `assets/js/main.js` 中的 `totalPages` 數值

```javascript
this.totalPages = 30; // 改為新的頁數
```

## 自訂樣式

編輯 `assets/css/style.css` 修改：
- 色彩主題（背景、文字、邊框）
- 字型與排版
- 區塊尺寸與間距
- 響應式斷點

## 瀏覽器相容性

- Chrome / Edge / Firefox / Safari（最新版本）
- iOS Safari / Chrome for Android

## 建議

- 圖片大小控制在 200-400KB 以內，加快載入速度
- 使用 WebP 格式可進一步降低檔案大小
- 考慮加入 Sitemap 與 robots.txt 以利 SEO

## 許可證

© 2026 WANJOU LEE. All rights reserved.

---

**提示**：此專案可自由修改與部署，但請保留作者資訊。
