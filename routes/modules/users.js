const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查是否已註冊
  User.findOne({ email })
    .then(user => {
      // 已註冊: 返回註冊頁面
      if (user) return res.render('register', { name, email, password, confirmPassword })
      // 未註冊: 資料庫新增使用者後重導至登入頁
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/logout', (req, res) => {

})

module.exports = router