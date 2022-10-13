// 使用Mongoose與MongoDB連線
const mongoose = require('mongoose')// 載入 mongoose
mongoose.connect(process.env.MONGODB_URI_restaurant_list, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得連線資訊
const db = mongoose.connection
// 監聽連線狀況
db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb is connecting'))

module.exports = db