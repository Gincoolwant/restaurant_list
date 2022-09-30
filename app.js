const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/restaurants/1', (req, res) => {
  res.render('show')
})

app.listen(port, () =>{
  console.log(`connetcting to http://localhost:3000`)
})