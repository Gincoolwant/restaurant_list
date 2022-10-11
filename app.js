const express = require('express')
const app = express()
const port = 3000
const Restaurant = require('./models/restaurant')


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
const restaurant = require('./models/restaurant')
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義模板引擎, (ext:.handlebars, 設定初始layout: main.handlebars)
app.set('view engine', 'handlebars') // express設置註冊模板引擎
app.use(express.static('public')) // 告訴express每次先讀取靜態檔的位置

// 引用 body - parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/', (req, res) => {
  // render所有restaurants
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/new', (req, res) => {
  return Restaurant.create({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image ? req.body.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png',
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  // render特定_id restaurant show頁面 
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  return Restaurant.find()
    .lean()
    .then(restaurants => {
      // 先打包所有restaurants再過濾包含keyword的list
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
      
      // render搜尋結果，若無符合結果render無符合頁面 
      if (filterRestaurants.length) {
        res.render('index', { restaurants: filterRestaurants, keyword })
      } else {
        res.render('noMatchCase', { keyword })
      }

    })
    .catch(error => console.error(error))

})

app.listen(port, () => {
  console.log(`connecting to http://localhost:3000`)
})