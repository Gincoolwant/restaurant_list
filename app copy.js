const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json').results

// 使用Mongoose與MongoDB連線
// 載入 mongoose
const mongoose = require('mongoose')
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI_restaurant_list, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得連線資訊
const db = mongoose.connection
// 監聽連線狀況
db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb is connecting'))

// 使用template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義模板引擎, (ext:.handlebars, 設定初始layout: main.handlebars)
app.set('view engine', 'handlebars') // express設置註冊模板引擎
app.use(express.static('public')) // 告訴express每次先讀取靜態檔的位置

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurant = restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))

  if(restaurant.length){
    res.render('index', { restaurant, keyword })
  }else{
    res.render('noMatchCase', {keyword })
  }
  
})

app.listen(port, () =>{
  console.log(`connecting to http://localhost:3000`)
})