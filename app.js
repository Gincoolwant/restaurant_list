const express = require('express')
const routes = require('./routes')

// 使用Mongoose與MongoDB連線
const mongoose = require('mongoose')// 載入 mongoose
mongoose.connect(process.env.MONGODB_URI_restaurant_list, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得連線資訊
const db = mongoose.connection
// 監聽連線狀況
db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb is connecting'))

const app = express()

// 使用template engine
const exphbs = require('express-handlebars')
const restaurant = require('./models/restaurant')
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義模板引擎, (ext:.handlebars, 設定初始layout: main.handlebars)
app.set('view engine', 'handlebars') // express設置註冊模板引擎
app.use(express.static('public')) // 告訴express每次先讀取靜態檔的位置

// 引用 body - parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(routes)

const port = 3000
app.listen(port, () => {
  console.log(`connecting to http://localhost:3000`)
})