const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  // render所有restaurants
  return Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const { sort, order, title } = req.query
  const keyword = req.query.keyword.trim()
  const keywordRegExp = new RegExp(keyword, 'i')
  return Restaurant.find({
    userId, 
    $or: [{ name: keywordRegExp }, { category: keywordRegExp }]
  })
    .sort({ [sort]: order })
    .lean()
    .then(restaurants => {
      // render搜尋結果，若無符合結果render無符合頁面
      if (restaurants.length) {
        res.render('index', { restaurants , keyword, title})
      } else {
        res.render('noMatchCase', { keyword })
      }
    })
    .catch(error => console.error(error))
})

module.exports = router
