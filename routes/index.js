const express = require('express')
const restaurant = require('../models/restaurant')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/restaurants/', restaurants)

module.exports = router