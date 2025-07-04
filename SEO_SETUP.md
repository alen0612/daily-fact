# SEO 設定說明

## 📋 已實作的功能

### ✅ Sitemap.xml
- **位置**: `/public/sitemap.xml`
- **格式**: XML sitemap 標準格式
- **內容**: 目前包含首頁，未來可擴充

### ✅ Robots.txt
- **位置**: `/public/robots.txt`
- **設定**: 允許所有搜尋引擎索引
- **包含**: Sitemap 位置指引

## 🗺️ Sitemap.xml 詳細說明

### 目前結構
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-07-04</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 參數說明
- **`<loc>`**: 頁面 URL（部署時需要更新網域）
- **`<lastmod>`**: 最後修改日期
- **`<changefreq>`**: 更新頻率（daily = 每日更新）
- **`<priority>`**: 優先級（1.0 = 最高優先級）

### 未來擴充
當加入 `/facts/yyyy-mm-dd` 頁面時，可以動態生成 sitemap：

```xml
<url>
  <loc>https://yourdomain.com/facts/2025-07-04</loc>
  <lastmod>2025-07-04</lastmod>
  <changefreq>never</changefreq>
  <priority>0.8</priority>
</url>
```

## 🤖 Robots.txt 詳細說明

### 目前設定
```
User-agent: *
Allow: /

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml

# 爬蟲延遲（可選）
Crawl-delay: 1
```

### 參數說明
- **`User-agent: *`**: 適用於所有搜尋引擎爬蟲
- **`Allow: /`**: 允許索引整個網站
- **`Sitemap:`**: 指定 sitemap 位置
- **`Crawl-delay: 1`**: 建議爬蟲延遲 1 秒（可選）

## 🔧 部署前需要更新

### 1. 更新網域
在以下檔案中將 `https://yourdomain.com` 替換為實際網域：

- `public/sitemap.xml` (第 4 行)
- `public/robots.txt` (第 4 行)

### 2. 更新日期
在 `sitemap.xml` 中更新 `<lastmod>` 為實際部署日期。

## 🧪 測試方法

### Sitemap 測試
1. **瀏覽器測試**: 直接訪問 `https://yourdomain.com/sitemap.xml`
2. **Google Search Console**: 提交 sitemap 進行驗證
3. **線上工具**: 使用 [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### Robots.txt 測試
1. **瀏覽器測試**: 直接訪問 `https://yourdomain.com/robots.txt`
2. **Google Search Console**: 測試 robots.txt 設定
3. **線上工具**: 使用 [Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)

## 📊 SEO 最佳實踐

### Sitemap 最佳實踐
- **包含所有重要頁面**: 確保所有公開頁面都在 sitemap 中
- **正確的更新頻率**: 根據內容更新頻率設定
- **合理的優先級**: 首頁最高，其他頁面遞減
- **準確的修改日期**: 反映實際內容更新時間

### Robots.txt 最佳實踐
- **簡潔明確**: 避免複雜的規則
- **包含 Sitemap**: 幫助搜尋引擎找到 sitemap
- **適當的延遲**: 避免對伺服器造成過大負擔
- **定期檢查**: 確保規則符合網站需求

## 🔄 動態 Sitemap 生成

### 未來實作建議
當網站有動態內容時，可以建立動態 sitemap 生成：

```javascript
// 範例：動態生成 sitemap
export async function generateSitemap() {
  const baseUrl = 'https://yourdomain.com';
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [
    {
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0
    },
    // 未來可以加入每日冷知識頁面
    // {
    //   loc: `${baseUrl}/facts/${today}`,
    //   lastmod: today,
    //   changefreq: 'never',
    //   priority: 0.8
    // }
  ];
  
  return urls;
}
```

### API 路由實作
```typescript
// app/sitemap.ts
import { generateSitemap } from '../utils/sitemap';

export async function GET() {
  const urls = await generateSitemap();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

## 📈 監控和分析

### 建議的監控項目
- **索引狀態**: 檢查頁面是否被搜尋引擎索引
- **爬蟲活動**: 監控搜尋引擎爬蟲訪問
- **Sitemap 錯誤**: 檢查 sitemap 是否有錯誤
- **搜尋排名**: 追蹤關鍵字排名變化

### 分析工具
- **Google Search Console**: 主要 SEO 監控工具
- **Bing Webmaster Tools**: Bing 搜尋引擎監控
- **Yandex Webmaster**: Yandex 搜尋引擎監控
- **自定義分析**: 建立爬蟲訪問日誌

## 🔧 故障排除

### 常見問題
1. **Sitemap 404 錯誤**: 檢查檔案路徑和網域設定
2. **Robots.txt 無效**: 確認語法正確，沒有多餘空格
3. **搜尋引擎不索引**: 檢查 robots.txt 是否阻擋
4. **Sitemap 格式錯誤**: 驗證 XML 格式是否正確

### 驗證工具
- **XML 驗證**: [W3C XML Validator](https://validator.w3.org/)
- **Sitemap 驗證**: [Google Sitemap Validator](https://www.google.com/webmasters/tools/)
- **Robots.txt 測試**: [Google Robots.txt Tester](https://www.google.com/webmasters/tools/robots-testing-tool)

## 📝 更新記錄

- **2025-07-04**: 初始實作 SEO 檔案
- 建立靜態 sitemap.xml
- 設定 robots.txt 允許索引
- 準備未來動態 sitemap 擴充 