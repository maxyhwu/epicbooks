# Web App 期末專案: ePicBooks

## 功能說明：

 ePicBooks是一個線上的繪本交易平台。在ePicBooks中，使用者在未登入的時候可以瀏覽繪本商城的資訊，例如：推薦系統、銷量排行、新進藏書。若使用者想要進行買賣行為、加入最愛等功能，需點擊網站右上角按鈕填寫基本資料後進行註冊登入。在主頁面可以瀏覽商城繪本的部分資訊，點擊more按鈕會引導到該繪本的詳細資料頁面，在這個頁面下方共有三個按鈕，第一個是加入最愛按鈕，點擊後會新增到用戶的最愛列表，用戶可以點擊頁面右上角的 My favorite 按鈕查看自己的最愛列表，也可在頁面內刪除該紀錄，第二個按鈕是 add to cart 按鈕，用戶可以在選完想要加入該商品之數量後按下，該繪本就會被加入到用戶的購物車，用戶可點擊右上角的 My cart 購物車，亦可在其中變更商品數量或刪除，點擊畫面右側的 checkout 按鈕即可結帳。最後一個則是add to sale cart按鈕，若用戶擁有網站陳列上的繪本並且想要賣出，他可以選擇欲販售的資料並按下按鈕，用戶可在右上角查看他們準備販售的繪本清單，按下畫面右邊的sell按鈕後填寫基本資料，該販售訂單即成立。除此以外我們也在主頁實作了search的功能方便使用者找尋想要的繪本，還有若使用者忘記他的密碼，我們的系統會用gmail驗證方式讓用戶重設密碼後登入。

## 後端 REST API 說明：
### 書籍資訊相關
```GET /api/search``` // 搜尋書籍
```GET /api/getBookInfo``` // 獲取單一書籍資料
```GET /api/getNewArrival``` // 獲取一段時間內的新書列表
```GET /api/getBestSelling``` // 獲取暢銷書籍列表
```GET /api/getRecommendations``` // 獲取指定分類的書籍列表

## 如何在 localhost 安裝與測試：

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

```bash

NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

3. Start the app

```bash
yarn dev
```
