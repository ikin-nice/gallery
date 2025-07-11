# 個人作品集網站專案

## 專案目標
創建一個簡約風格的個人作品集網站，適合以下對象使用：
- 設計師
- 開發者
- 攝影師
- 創作者

## 核心特色
- One Dark Pro 暗色主題設計
- 護眼友好的配色方案
- 響應式佈局（支援桌面、平板、手機）
- 大圖展示效果
- 自我介紹區塊
- 互動式聯絡表單
- 多語言支援（中文、英文、日文、韓文）
- 自訂主題色彩功能

## 技術棧
- HTML5
- CSS3（採用 CSS 變數實現主題配色）
- JavaScript（原生 JS，無框架）
- 外部庫：
  - Font Awesome (CDN) - 用於圖示
  - AOS (CDN) - 用於滾動動畫效果

## 主題配色系統
### 預設深色主題
```css
--primary-color: #282c34    /* 主要背景色 */
--secondary-color: #61afef  /* 強調色，用於連結和按鈕 */
--text-color: #abb2bf      /* 主要文字顏色 */
--light-color: #21252b     /* 次要背景色 */
--accent-color: #98c379    /* 次要強調色 */
--border-color: #3e4451    /* 邊框顏色 */
--hover-color: #3e4451     /* 懸停效果顏色 */
--bg-color: #282c34       /* 全域背景色 */
--card-bg: #21252b        /* 卡片背景色 */
```

### 預設淺色主題
```css
--primary-color: #ffffff    /* 主要背景色 */
--secondary-color: #2973af  /* 強調色，用於連結和按鈕 */
--text-color: #333333      /* 主要文字顏色 */
--light-color: #f5f5f5     /* 次要背景色 */
--accent-color: #4a9d4f    /* 次要強調色 */
--border-color: #dddddd    /* 邊框顏色 */
--hover-color: #eeeeee     /* 懸停效果顏色 */
--bg-color: #ffffff       /* 全域背景色 */
--card-bg: #f5f5f5        /* 卡片背景色 */
```

## 專案特性記錄（2025年6月23日更新）

### 已完成功能
- [x] 基本頁面結構（HTML）
- [x] 響應式樣式設計（CSS）
- [x] 導覽列（含手機版漢堡選單）
- [x] 首頁大圖展示區
- [x] 關於我區塊
- [x] 作品集展示區（含懸停效果）
- [x] 聯絡表單（包含完整前端驗證）
- [x] 頁尾社群連結
- [x] One Dark Pro 暗色主題實現
- [x] 深色/淺色主題切換功能
- [x] Lightbox 作品預覽功能
- [x] 捲動進度指示器
- [x] 作品集篩選功能
- [x] 圖片延遲載入優化
- [x] AOS 動畫效果
- [x] 互動效果和過渡動畫
- [x] 多語言支援（中、英、日、韓）
- [x] 自訂主題顏色功能（含儲存功能）
- [x] 主題分享功能（透過 URL 參數）

### 待完成功能
- [ ] SEO 優化（Meta 標籤、Schema.org）
- [ ] 網站效能進一步優化
- [ ] 作品集標籤系統
- [ ] 作品集分頁功能
- [ ] 後端API整合
- [ ] PWA 支援
- [ ] 圖片最佳化（WebP 格式支援）
- [ ] 社群媒體分享功能
- [ ] 作品集詳細頁面
- [ ] 網站地圖

## 多語言支援記錄
目前支援的語言：
- 繁體中文 (zh-tw)
- 英文 (en-us)
- 日文 (ja-jp)
- 韓文 (ko-kr)

語言檔案位置：`js/lang/`

## 資料夾結構
```
.
├── index.html          # 主要 HTML 文件
├── AGENTS.md          # AI 開發記錄文件
├── SPEC.md           # 專案規格文件
├── css/
│   └── style.css      # 主要樣式表（含響應式設計）
├── js/
│   ├── main.js        # 主要 JavaScript 功能
│   └── lang/          # 多語言支援檔案
│       ├── zh-tw.js   # 繁體中文
│       ├── en-us.js   # 英文
│       ├── ja-jp.js   # 日文
│       └── ko-kr.js   # 韓文
└── images/            # 圖片資源
    ├── hero-bg.jpg    # 首頁背景圖
    ├── work-1.jpg     # 作品展示圖 1
    ├── work-2.jpg     # 作品展示圖 2
    └── work-3.jpg     # 作品展示圖 3
```

## 開發注意事項
1. 所有外部庫都使用 CDN 版本，避免本地依賴
2. 使用 CSS 變數管理主題配色
3. JavaScript 採用模組化設計
4. 圖片必須使用 `loading="lazy"` 屬性
5. 保持良好的程式碼註釋
6. 維護響應式設計的一致性

## 響應式設計斷點
- 手機版：max-width: 480px
- 平板版：max-width: 768px
- 桌面版：min-width: 769px

## 已知問題
1. 某些動畫效果在低效能裝置上可能造成卡頓
2. 需要優化大型圖片的載入策略
3. localStorage 使用量需要監控
4. 某些舊版瀏覽器可能不支援 CSS 變數

## 建議優先處理事項
1. 實作圖片最佳化（包括 WebP 支援）
2. 添加 SEO 相關標籤
3. 改善網站效能指標
4. 實作作品集分頁功能
5. 添加後端 API 整合

## AI 開發備註
1. 使用 CSS 變數實現主題系統，方便擴展
2. 所有互動功能都有適當的錯誤處理
3. 圖片載入使用漸進式策略
4. 主題設定儲存在 localStorage
5. 程式碼中保留詳細註釋供後續開發參考

## 更新日誌
- 2025-06-23 (2)：新增主題分享功能
- 2025-06-23 (1)：新增自訂主題顏色功能
- 2025-06-09 (4)：新增 Lightbox 預覽和捲動進度指示器
- 2025-06-09 (3)：完成作品集篩選功能和動畫優化
- 2025-06-09 (2)：實作深色/淺色主題切換功能
- 2025-06-09 (1)：初始化專案，完成基本架構和樣式設計

## 後續開發建議
1. 考慮添加更多主題預設組合
2. 添加更多互動效果
3. 優化行動裝置的觸控體驗
4. 考慮添加主題預覽功能
5. 實作主題收藏功能
6. 開發主題社群分享平台