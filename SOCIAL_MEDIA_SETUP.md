# 社交媒體分享設定說明

## 📋 已實作的功能

### ✅ Open Graph (Facebook, LINE, 其他社交平台)
- 動態標題和描述（支援多語言）
- 封面圖片設定（1200x630 標準尺寸）
- 多語言 locale 支援
- 完整的圖片屬性設定

### ✅ Twitter Card
- Large Image Card 格式
- 動態標題和描述
- 圖片和替代文字設定
- 創作者和網站帳號設定

### ✅ 多語言支援
- 繁體中文 (zh-TW)
- 簡體中文 (zh-CN)
- 英文 (en)
- 日文 (ja)
- 韓文 (ko)

## 🛠️ 部署前需要更新的設定

### 1. 更新網域設定
在以下檔案中將 `https://yourdomain.com` 替換為實際的網域：

- `app/head.tsx` (第 47 和 53 行)
- `app/layout.tsx` (第 25 行)

### 2. 更新 Twitter 帳號
在以下檔案中將 `@yourtwitterhandle` 替換為實際的 Twitter 帳號：

- `app/head.tsx` (第 67 和 68 行)
- `app/layout.tsx` (第 42 和 43 行)

## 🧪 測試工具

### Facebook 分享測試
1. 前往 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. 輸入網站 URL
3. 點擊 "Debug" 查看預覽
4. 點擊 "Scrape Again" 清除快取

### Twitter Card 測試
1. 前往 [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. 輸入網站 URL
3. 查看預覽效果
4. 點擊 "Preview card" 測試

### LINE 分享測試
1. 在 LINE 中分享網站連結
2. 檢查是否顯示正確的標題、描述和圖片

## 📱 支援的社交平台

### 主要平台
- **Facebook**: 完整支援 Open Graph
- **Twitter**: 完整支援 Twitter Card
- **LINE**: 支援 Open Graph
- **LinkedIn**: 支援 Open Graph
- **WhatsApp**: 支援 Open Graph

### 其他平台
- **Discord**: 支援 Open Graph
- **Telegram**: 支援 Open Graph
- **Slack**: 支援 Open Graph

## 🎨 封面圖片規格

### 建議尺寸
- **寬度**: 1200px
- **高度**: 630px
- **格式**: PNG 或 JPG
- **檔案大小**: 建議小於 1MB

### 設計建議
- 使用高對比度的顏色
- 包含網站名稱和標語
- 避免在邊緣放置重要元素
- 確保在不同平台上都能清楚顯示

## 🔄 動態內容更新

目前使用靜態封面圖片 `/og-image.png`。未來如需根據每日冷知識動態生成封面圖，可以：

1. 建立動態圖片生成 API
2. 在 `getImageUrl()` 函數中根據日期或語言返回不同的圖片
3. 使用 Canvas API 或圖片處理服務生成動態封面

## 📊 監控和分析

### 建議的監控項目
- 分享次數統計
- 點擊率追蹤
- 不同平台的表現比較
- 多語言版本的受歡迎程度

### 分析工具
- Google Analytics
- Facebook Insights
- Twitter Analytics
- 自定義事件追蹤

## 🚀 效能優化

### 已實作的優化
- 圖片預載入 (`<link rel="preload">`)
- 正確的圖片尺寸設定
- 壓縮的 PNG 格式
- 快取友好的檔案命名

### 建議的進一步優化
- 使用 WebP 格式（需要提供 fallback）
- 實作圖片 CDN
- 加入圖片 lazy loading
- 使用 Service Worker 快取

## 🔧 故障排除

### 常見問題
1. **圖片不顯示**: 檢查圖片 URL 是否正確，確保圖片可公開存取
2. **標題不更新**: 清除社交平台的快取
3. **描述被截斷**: 確保描述長度在 200 字元以內
4. **多語言不生效**: 檢查 locale 設定是否正確

### 快取清除
- Facebook: 使用 Sharing Debugger 的 "Scrape Again"
- Twitter: 使用 Card Validator 重新驗證
- LINE: 清除應用程式快取或重新安裝

## 📝 更新記錄

- **2025-07-04**: 初始實作多語言社交媒體分享功能
- 支援 5 種語言
- 完整的 Open Graph 和 Twitter Card 設定
- 動態語言檢測和切換 