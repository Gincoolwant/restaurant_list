const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  // render所有restaurants
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/search', (req, res) => {
  const {keyword, sort, order, title} = req.query
  return Restaurant.find()
    .sort({[sort] : order})
    .lean()
    .then(restaurants => {
      // 先打包所有restaurants再過濾包含keyword的list
      const filterRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))

      // render搜尋結果，若無符合結果render無符合頁面
      if (filterRestaurants.length) {
        res.render('index', { restaurants: filterRestaurants, keyword, title})
      } else {
        res.render('noMatchCase', { keyword })
      }
    })
    .catch(error => console.error(error))
})

module.exports = router
