// 載入 mongoose & model
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI_restaurant_list, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得連線資訊
const db = mongoose.connection
// 監聽連線狀況
db.on('error', () => console.log('mongodb error'))
db.once('open', () => {
  console.log('mongodb is connecting')
  restaurantList.forEach(restaurant => {
    Restaurant.create({
       id: `${restaurant.id}`,
       name: `${restaurant.name}`,
       name_en: `${restaurant.name_en}`,
       category: `${restaurant.category}`,
       image: `${restaurant.image}`,
       location: `${restaurant.location}`,
       phone: `${restaurant.phone}`,
       google_map: `${restaurant.google_map}`,
       rating: `${restaurant.rating}`,
       description: `${restaurant.description}`
    })
  });
})