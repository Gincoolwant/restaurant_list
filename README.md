# 我的餐廳清單
練習使用Node.js & Express架設附有瀏覽清單、查看詳細資訊與查詢/編輯/刪除功能的美食餐廳清單網站。

![index](./public/images/index.png)
![show](./public/images/show.png)
![create](./public/images/create.png)
![edit](./public/images/edit.png)
![sorting](./public/images/sorting.png)

## 功能詳情
+ 可在首頁看到附有簡易資訊(店名、餐廳類型、評分)的餐廳清單列表。
+ 點擊餐廳可檢視詳細資訊(店名、餐廳類型、地址、地圖資訊-via google map、電話、簡介)。
+ 可透過店名及餐廳類型進行關鍵字搜尋。
+ 可新增餐廳。
+ 可編輯餐廳內容。
+ 可刪除餐廳。
+ 可依店名(升降冪)、類型、地區排序。

## 安裝執行
1. 確認安裝node.js & npm。
2. 開啟Terminal將專案 clone 至本地位置：
`git clone https://github.com/Gincoolwant/restaurant_list.git`
3. 開啟Terminal並移至專案資料夾安裝使用套件： `npm install`
4. 執行專案： `npm run start`

成功連線會看見訊息： `connecting to http://localhost:3000`，請開啟瀏覽器輸入網址 http://localhost:3000 進入首頁。


## 開發環境與工具
+ [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/)
+ [Node.js@16.17.0](https://nodejs.org/en/)
+ [Express@4.16.4](https://www.npmjs.com/package/express)
+ [Express-Handlebars@3.0.0](https://www.npmjs.com/package/express-handlebars)
+ [Bootstrap@v5.2](https://getbootstrap.com/)
+ [Font-awesome@6.2.0](https://fontawesome.com/)
+ [Body-parser@1.20.1](https://www.npmjs.com/package/body-parser)
+ [Method-override@3.0.0](https://www.npmjs.com/package/method-override)
+ [MongoDB Cloud](https://www.mongodb.com/)
+ [Mongoose@5.9.7](https://mongoosejs.com/)


## 開發人員
[CK](https://github.com/Gincoolwant)