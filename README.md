This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🚀 部署到 Vercel 並通過 Google 廣告審核

### 1. 部署網站到 Vercel

#### 方法一：GitHub 自動部署（推薦）
1. 將專案推送到 GitHub 倉庫
2. 前往 [Vercel](https://vercel.com) 並登入
3. 點擊「New Project」
4. 選擇您的 GitHub 倉庫
5. 保持預設設定，點擊「Deploy」
6. 部署完成後，Vercel 會自動為您分配一個域名（例如：`your-project.vercel.app`）

#### 方法二：手動部署
1. 安裝 Vercel CLI：`npm i -g vercel`
2. 在專案根目錄執行：`vercel`
3. 按照提示完成設定
4. 部署完成後會得到一個域名

### 2. 插入 Google AdSense 驗證程式碼

在 `app/head.tsx` 檔案中，已經包含了 Google AdSense 的驗證程式碼：

```tsx
{/* Google AdSense 驗證程式碼 */}
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1281401893626384"
  crossOrigin="anonymous"
></script>
```

如果您需要更換 Publisher ID，請將 `ca-pub-1281401893626384` 替換為您的 ID。

### 3. 完成 Google AdSense 驗證

1. 前往 [Google AdSense](https://www.google.com/adsense) 後台
2. 在網站審核頁面中，找到您的網站
3. **重要**：勾選「我已加入程式碼」選項
4. 點擊「驗證」按鈕
5. 等待 Google 系統檢查您的網站

### 4. AdSense 驗證失敗的常見原因

如果您遇到 AdSense 驗證失敗的問題，請檢查以下常見原因：

#### 🔧 Next.js App Router 架構問題
- **問題**：如果使用 Next.js App Router 架構，直接在 `app/head.tsx` 放 `<script>` 標籤並不會出現在最終的 HTML 中
- **解決方案**：應改用 `next/script` 提供的 `<Script>` 元件來插入 AdSense 驗證碼

```tsx
import Script from 'next/script';

// 在 head.tsx 中使用
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

#### 🚀 部署和驗證步驟
1. 插入驗證碼後，記得重新部署網站
2. 部署完成後，在 AdSense 後台按下「驗證」按鈕
3. 確保驗證碼在網站原始碼中可見（可以按 F12 查看網頁原始碼）

#### 📋 其他檢查項目
- 確認 Publisher ID 是否正確
- 確認網站是否正常運作且可公開訪問
- 確認網站內容符合 AdSense 政策

### 5. 審核時間

- Google AdSense 審核通常需要 **1～3 個工作天**
- 審核期間請確保網站正常運作
- 如果 3 天後仍未通過，請檢查：
  - 網站是否正常載入
  - 驗證程式碼是否正確插入
  - 網站內容是否符合 AdSense 政策

## 🧠 關於 facts.json

所有冷知識資料都放在 `src/data/facts.json` 這個檔案裡，每一筆都要遵守以下規則：

- 必須有三個欄位：
  - `id`：格式為 `YYYYMMDD-001`，日期要和 `date` 對應
  - `date`：格式為 `YYYY-MM-DD`
  - `translations`：必須包含五種語言（`zh-TW`、`zh-CN`、`en`、`ja`、`ko`），每個語言都不能是空字串
- 所有內容都不能重複（不只是文字，連語意也要不同！）
- 建議每次新增完畢後，執行 `pnpm tsx scripts/validate-facts.ts` 來檢查格式，這樣比較安心 😎

想讓冷知識更豐富？歡迎多多補充，但記得保持資料乾淨、語意新鮮！
