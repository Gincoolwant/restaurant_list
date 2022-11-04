const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const usePassport = require('./config/passport') // 會用到session, 一定要放在express-session之後
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義模板引擎, (ext:.handlebars, 設定初始layout: main.handlebars)
app.set('view engine', 'handlebars') // express設置註冊模板引擎
app.use(express.static('public')) // 告訴express每次先讀取靜態檔的位置
app.use(bodyParser.urlencoded({ extended: true })) // 用 app.use 規定每次request都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method')) // 為使用符合RESTful API的PUT、DELETE路由
app.use(session({ secret: 'ckSecret', resave: false, saveUninitialized: true })) // 設定session

usePassport(app) // 前置設置認證策略
app.use((req, res, next) =>{
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes) // 導至總路由

// 監聽server啟動
app.listen(port, () => {
  console.log('connecting to http://localhost:3000')
})
