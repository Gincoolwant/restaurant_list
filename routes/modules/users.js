const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user.js')

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 取得註冊參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'name以外欄位皆為必填欄位' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '兩次密碼輸入不相符。' })
  }
  if (errors.length) {
    return res.render('register', { name, email, password, confirmPassword, errors })
  }



  // 檢查是否已註冊
  User.findOne({ email })
    .then(user => {
      // 已註冊: 返回註冊頁面
      if (user) {
        errors.push({ message: '此email已註冊。' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      }
      // 未註冊: 資料庫新增使用者後重導至登入頁
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/users/login'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err)
    req.flash('success_msg', '你已登出。')
    return res.redirect('/users/login')
  })
})

module.exports = router