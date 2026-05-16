# 遙距企業開戶 (Remote Corporate Onboarding)

這是一個企業遙距開戶的網頁應用程式原型 (Prototype)，支援繁體中文、簡體中文及英文介面，包含表單填寫、文件上傳掃描模擬，以及簽名功能。

## 技術棧

* **前端框架**: React + Vite
* **樣式**: Tailwind CSS
* **圖示**: Lucide React
* **動畫**: Framer Motion
* **部署**: GitHub Pages (已包含 GitHub Actions 設定，推送到 \`main\` 分支將自動部署)

## 本地開發 (Local Development)

1. 安裝套件:
\`\`\`bash
npm install
\`\`\`

2. 啟動開發伺服器:
\`\`\`bash
npm run dev
\`\`\`

3. 打包專案:
\`\`\`bash
npm run build
\`\`\`

## GitHub Pages 部署

專案中已經包含了 `.github/workflows/deploy.yml`。
當您將程式碼推送到 GitHub 上的 `main` 分支時，GitHub Actions 會自動幫您打包並部署到 GitHub Pages。

**設定步驟：**
1. 將程式碼推送到您的 GitHub Repository。
2. 到您的 GitHub Repository 設定頁面 (Settings) -> Pages。
3. 確認 Source 剛好是指向 \`gh-pages\` branch 或是由 GitHub Actions 控制 (取決於您的倉儲設定，現已預設為 GitHub Actions 處理)。
4. 部署完成後，即可透過 URL 存取。
