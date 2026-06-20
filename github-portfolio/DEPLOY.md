# GitHub Pages 部署快速指南

## 5 分鐘上線你的作品集

### 步驟 1：準備 GitHub 帳號
- 如果還沒有，到 [github.com](https://github.com) 註冊免費帳號

### 步驟 2：建立新倉庫
1. 登入 GitHub
2. 點右上角 `+` → **New repository**
3. 倉庫名稱：`portfolio` （或任何名字）
4. 勾選 "Add a README file"（可選）
5. 按 **Create repository**

### 步驟 3：上傳檔案

#### 選項 A：用 GitHub Web 介面上傳（最簡單）
1. 進入新建的倉庫
2. 點 **Add file** → **Upload files**
3. 拖拽此專案的所有檔案到上傳區
4. 底部按 **Commit changes**

#### 選項 B：用 Git 命令（進階）
```bash
# 在本機專案資料夾執行
git init
git add .
git commit -m "Initial commit: Portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

### 步驟 4：啟用 GitHub Pages
1. 進入倉庫的 **Settings**（在頁面右上方）
2. 左邊選單找 **Pages**
3. **Source** 選 `Deploy from a branch`
4. **Branch** 選 `main` / `/ (root)`
5. 按 **Save**

### 步驟 5：檢查線上狀態
- GitHub 會顯示網址，通常是 `https://your-username.github.io/portfolio`
- 按下網址，幾秒內就能看到你的作品集上線

---

## 常見問題

**Q: 網站沒有出現？**
- 等 1-2 分鐘，GitHub 需要時間部署
- 檢查倉庫設定中 Pages 的 Source 是否正確設為 `main` 分支
- 確認檔案結構是否正確（index.html 在根目錄）

**Q: 圖片無法顯示？**
- 檢查 `assets/pages/` 資料夾是否存在所有 27 張圖片
- 確認檔案名稱格式是 `page-01.jpg`, `page-02.jpg` 等

**Q: 如何更新內容？**
- 修改檔案後，直接用 Git 推送新版本即可：
```bash
git add .
git commit -m "Update portfolio content"
git push origin main
```
- GitHub 會自動部署更新（通常 1-2 分鐘內生效）

**Q: 如何用自己的域名？**
- 在倉庫 Settings → Pages 中，**Custom domain** 欄位輸入你的域名
- 修改你的域名 DNS 設定，指向 GitHub Pages
- [詳細教學](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 推薦工具

- **GitHub Desktop** — 視覺化 Git 操作
- **Visual Studio Code** — 編輯 HTML/CSS/JS
- **Squoosh** — 線上圖片壓縮

祝你上線成功！🚀
