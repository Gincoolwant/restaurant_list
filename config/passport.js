const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false, { message: 'That email is not registered!' })
        if (user.password !== password) return done(null, false, { message: 'Email or Password incorrect.' })
        return done(null, user)
      })
      .catch(err => done(err))
  }));

  // 設定序列化(設定session要存哪些常存取的info)
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 設定反序列化(session使用session.value(id)到資料庫找完整的info)
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  });
}
