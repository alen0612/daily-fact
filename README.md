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

## 🧠 關於 facts.json

所有冷知識資料都放在 `src/data/facts.json` 這個檔案裡，每一筆都要遵守以下規則：

- 必須有三個欄位：
  - `id`：格式為 `YYYYMMDD-001`，日期要和 `date` 對應
  - `date`：格式為 `YYYY-MM-DD`
  - `translations`：必須包含五種語言（`zh-TW`、`zh-CN`、`en`、`ja`、`ko`），每個語言都不能是空字串
- 所有內容都不能重複（不只是文字，連語意也要不同！）
- 建議每次新增完畢後，執行 `pnpm tsx scripts/validate-facts.ts` 來檢查格式，這樣比較安心 😎

想讓冷知識更豐富？歡迎多多補充，但記得保持資料乾淨、語意新鮮！
