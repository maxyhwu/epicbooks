# Web App 期末專案: ePicBooks

## 功能說明：

 ePicBooks 是一個線上的繪本交易平台。在ePicBooks中，使用者在未登入的時候可以瀏覽繪本商城的資訊，例如：推薦系統、銷量排行、新進藏書。若使用者想要進行購物進入網站進行註冊登入後，便可進入主頁。左上方會有買家和賣家模式可以選擇，若選擇賣家，則可以新增商品、還可以個人化設計該商品的款式，並進入商品的詳細內容頁面中瀏覽、編輯或刪除。若選擇買家，則可以檢視平台上已經有的商品進行選購，且可以進入購物車中進行結帳。此外，買家還可以在該商品底下評分和留言。


## 如何在 localhost 安裝與測試：

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local` file in the root of the project and add a valid Postgres URL. To get a Postgres URL, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4). Besides, get google cloud's id and secret from google clout website. Below is the example:

```bash
POSTGRES_URL=postgres://postgres:postgres@localhost:5432/final2
AUTH_SECRET="Any string you like"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

- Google Cloud Service的設定：詳情請見(https://ric2k1.notion.site/09-Third-party-API-Services-and-Packages-e6abb698bc4d42f9815f47d6766c58df)中Google Calendar -> 實作步驟 -> Setup Google Cloud Service，將獲得的google cloud id 和 secret加入.env.local中

5.  Run the migrations

```bash
yarn migrate
```

5. Start the app

```bash
yarn dev
```
