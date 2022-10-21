const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String, // 資料型別
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String // 資料型別
  },
  category: {
    type: String, // 資料型別
    required: true // 這是個必填欄位
  },
  image: {
    type: String // 資料型別
  },
  location: {
    type: String, // 資料型別
    required: true // 這是個必填欄位
  },
  phone: {
    type: String // 資料型別
  },
  google_map: {
    type: String // 資料型別
  },
  rating: {
    type: Number // 資料型別
  },
  description: {
    type: String // 資料型別
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
