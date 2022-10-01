const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) // 定義模板引擎, (ext:.handlebars, 設定初始layout: main.handlebars)
app.set('view engine', 'handlebars') // express設置註冊模板引擎

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurant = restaurantList.results.filter(restaurant => (restaurant.name.toLowerCase().includes(keyword.toLowerCase())) || restaurant.category.includes(keyword))

  if(restaurant.length){
    res.render('index', { restaurant, keyword })
  }else{
    res.render('noMatchCase', {keyword })
  }
  
})

app.listen(port, () =>{
  console.log(`connetcting to http://localhost:3000`)
})