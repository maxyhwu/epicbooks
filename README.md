# Web App 期末專案: ePicBooks

## 功能說明：

 ePicBooks是一個線上的繪本交易平台。在ePicBooks中，使用者在未登入的時候可以瀏覽繪本商城的資訊，例如：推薦系統、銷量排行、新進藏書。若使用者想要進行買賣行為、加入最愛等功能，需點擊網站右上角按鈕填寫基本資料後進行註冊登入。在主頁面可以瀏覽商城繪本的部分資訊，點擊more按鈕會引導到該繪本的詳細資料頁面，在這個頁面下方共有三個按鈕，第一個是加入最愛按鈕，點擊後會新增到用戶的最愛列表，用戶可以點擊頁面右上角的 My favorite 按鈕查看自己的最愛列表，也可在頁面內刪除該紀錄，第二個按鈕是 add to cart 按鈕，用戶可以在選完想要加入該商品之數量後按下，該繪本就會被加入到用戶的購物車，用戶可點擊右上角的 My cart 購物車，亦可在其中變更商品數量或刪除，點擊畫面右側的 checkout 按鈕即可結帳。最後一個則是add to sale cart按鈕，若用戶擁有網站陳列上的繪本並且想要賣出，他可以選擇欲販售的資料並按下按鈕，用戶可在右上角查看他們準備販售的繪本清單，按下畫面右邊的sell按鈕後填寫基本資料，該販售訂單即成立。除此以外我們也在主頁實作了search的功能方便使用者找尋想要的繪本，還有若使用者忘記他的密碼，我們的系統會用gmail驗證方式讓用戶重設密碼後登入。

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

## 後端 RESTful API 說明：
### 書籍資訊相關
```GET /api/search``` // 搜尋書籍

```GET /api/getBookInfo``` // 獲取單一書籍資料

```GET /api/getNewArrival``` // 獲取一段時間內的新書列表

```GET /api/getBestSelling``` // 獲取暢銷書籍列表

```GET /api/getRecommendations``` // 獲取指定分類的書籍列表

### 帳戶相關
```POST /api/login``` // 登入

```POST /api/register``` // 註冊

```POST /api/forgotPassword``` // 忘記密碼

```POST /api/resetPassword``` // 重設密碼

```GET /api/getUserInfo?username=``` // 獲得使用者個人資料

### 喜歡的書籍列表相關
```POST /api/addFavorite``` // 添加至喜歡列表

```POST /api/removeFavorite``` // 從喜歡列表移除

```GET /api/getFavorite``` // 獲得喜歡列表

### 想購買的書籍列表相關

```POST /api/addToCart``` // 添加至購物車

```POST /api/removeFromCart``` // 從購物車移除

```POST /api/clearCart``` // 清空購物車

```GET /api/getCart``` // 獲得購物車中的書籍列表

### 想賣出的書籍列表相關
```POST /api/addTSalesCart``` // 添加至想賣出的清單

```POST /api/removeFromSalesCart``` // 從想賣出的清單移除

```POST /api/clearSalesCart``` // 清空想賣出的清單

```GET /api/getSalesCart``` // 獲得想賣出的清單中的書籍列表

### 隨機資料相關
```GET /api/getRandomBooks``` // 獲取現有書籍列表

```PUT /api/genRandomBooks``` // 生成隨機的書籍

```DELETE /api/delRandomBooks``` // 刪除所有書籍

```GET /api/getNullUser``` // 獲取測試用的假帳號資料

```PUT /api/genNullUser``` // 生成測試用的假帳號資料

```DELETE /api/delNullUser``` // 刪除測試用的假帳號資料

## 如何在 localhost 安裝與測試：
1. Clone the repo
   
3. Install dependencies and start the app
   
```bash
cd backend
npm i && npm start
```

Terminal 會顯示於 localhost:8000 執行，且提醒 mongoDB 已連線，看到此條訊息代表啟動成功。
