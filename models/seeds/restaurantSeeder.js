const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurantList = require('../seeds/restaurants.json').results
const userList = require('../seeds/users.json').results
const db = require('../../config/mongoose')
const restaurant = require('../restaurant.js')

db.once('open', () => {
  Promise.all(
    userList.map(user => {
      const { email, password, restaurantIndex } = user
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const restaurants = restaurantList.filter(restaurant => {
            restaurant.userId = userId
            return restaurantIndex.includes(restaurant.id)
          })
          return Restaurant.create(restaurants)
        })
        .catch(err => console.log(err))
    })
  )
    .then(() => {
      console.log('Seeder is ready.')
      process.exit()
    })
})

  // db.once('open', () => {
  //   userList.forEach(user => {
  //     const { email, password, restaurantIndex } = user
  //     bcrypt
  //       .genSalt(10)
  //       .then(salt => bcrypt.hash(password, salt))
  //       .then(hash => User.create({
  //         email,
  //         password: hash
  //       }))
  //       .then(user => {
  //         const userId = user._id
  //         const restaurants = restaurantList.filter(restaurant => {
  //           restaurant.userId = userId
  //           return restaurantIndex.includes(restaurant.id)
  //         })
  //         return Promise.all(Array.from({ length: restaurantIndex.length },
  //           (_, i) => { Restaurant.create(restaurants[i]) }))
  //       })
  //       .then(() => {
  //         console.log('ok')
  //         // process.exit()
  //       })
  //   })


// })


