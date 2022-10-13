const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.get('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  // render特定_id restaurant show頁面 
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

router.get('/:restaurant_id/edit', (req, res) => {
  const restaurantId = req.params.restaurant_id
  // render特定_id restaurant show頁面 
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

router.put('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  // render特定_id restaurant show頁面 
  return Restaurant.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.category = req.body.category
      restaurant.image = req.body.image ? req.body.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png'
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(error => console.error(error))
})

router.delete('/:restaurant_id', (req, res) => {
  const restaurantId = req.params.restaurant_id
  // render特定_id restaurant show頁面 
  return Restaurant.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect(`/`))
    .catch(error => console.error(error))
})

module.exports = router