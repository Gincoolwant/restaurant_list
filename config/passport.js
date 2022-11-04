const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // localStrategy
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) return done(null, false, { message: '請輸入有效Email及密碼。' })
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) return done(null, false, { message: '請輸入有效Email及密碼。' })
            return done(null, user)
          })
          .catch(err => done(err))
      })
      .catch(err => done(err))
  }));

  // Facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      const { email, name } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          return bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: randomPassword
            }))
            .then(user => done(null, user))
            .catch(err => console.log(err))
        })
        .catch(err => done(err))
    }
  ));

  // Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_APP_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    function (accessToken, refreshToken, profile, done) {
      const { email, name } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          return bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: randomPassword
            }))
            .then(user => done(null, user))
            .catch(err => console.log(err))
        })
        .catch(err => done(err))
    }
  ));

  // 設定序列化(設定session要存哪些常存取的info)
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  // 設定反序列化(session使用session.value(id)到資料庫找完整的info存放在req.user)
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  });
}
