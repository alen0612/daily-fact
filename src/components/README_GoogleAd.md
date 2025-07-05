# GoogleAd 元件使用說明

## 功能特色

- 🎯 **環境自動切換**：開發環境使用測試廣告，正式環境使用真實廣告
- 🔒 **安全機制**：正式環境若未設定廣告單位 ID 則不顯示廣告
- 📱 **響應式設計**：支援自訂樣式，可適應不同螢幕尺寸
- ⚡ **效能優化**：Google AdSense script 只載入一次
- 🛡️ **錯誤處理**：包含完整的錯誤處理機制

## 環境設定

### 開發環境
- 自動使用 Google 提供的測試廣告單位：`ca-app-pub-3940256099942544/6300978111`
- 無需額外設定

### 正式環境
在 `.env.local` 或部署環境中設定：
```bash
NEXT_PUBLIC_ADSENSE_UNIT_ID=your-ad-unit-id-here
```

## 基本使用

```tsx
import GoogleAd from '@/components/GoogleAd';

// 基本使用
<GoogleAd />

// 自訂樣式
<GoogleAd 
  adStyle={{
    width: '728px',
    height: '90px',
    margin: '20px auto'
  }}
/>
```

## Props 說明

| Prop | 型別 | 必填 | 說明 |
|------|------|------|------|
| `adSlot` | `string` | ❌ | 廣告單位 ID（已由環境自動決定，可忽略） |
| `adStyle` | `React.CSSProperties` | ❌ | 自訂 CSS 樣式 |

## 常見使用場景

### 1. 橫幅廣告
```tsx
<GoogleAd 
  adStyle={{
    width: '728px',
    height: '90px',
    margin: '20px auto'
  }}
/>
```

### 2. 響應式廣告
```tsx
<GoogleAd 
  adStyle={{
    width: '100%',
    maxWidth: '728px',
    margin: '20px auto',
    minHeight: '90px'
  }}
/>
```

### 3. 側邊欄廣告
```tsx
<GoogleAd 
  adStyle={{
    width: '300px',
    height: '250px',
    margin: '10px 0'
  }}
/>
```

## 注意事項

1. **環境變數**：正式環境必須設定 `NEXT_PUBLIC_ADSENSE_UNIT_ID`
2. **Script 載入**：Google AdSense script 會自動載入，無需手動引入
3. **效能考量**：元件會確保 script 只載入一次
4. **錯誤處理**：若廣告初始化失敗，會在 console 顯示錯誤訊息
5. **型別安全**：完整的 TypeScript 支援

## 技術實作

- 使用 `useRef` 管理 DOM 元素引用
- 使用 `useEffect` 處理廣告初始化
- 動態載入 Google AdSense script
- 環境變數自動切換廣告單位
- 完整的錯誤處理機制 