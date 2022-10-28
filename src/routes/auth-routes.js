var express = require('express');
const { valid } = require('joi');
const passport = require('passport')
var router = express.Router();
const authController = require("../controllers/auth-controller")
const validation = require('../middlewares/joi-validation')
const {registerSchema, loginSchema} = require('../middlewares/validation-schemas/auth-schemas')
const { ensureAuth, ensureGuest } = require('../middlewares/googleAuth')

router.get('/gcnvnbm',(req,res) => {
   return res.send("aiii")
})
router.post('/register', validation(registerSchema), authController.register);
router.post('/login', validation(loginSchema), authController.login);
// router.get('/agoogle', passport.authenticate('google', { scope: ['profile','email'] }))

// router.get(
//     '/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//       res.redirect('/log')
//     }
//   )

//   const router = require('express').Router()
  //importing middleware
//   const { ensureAuth, ensureGuest } = require('../middleware/auth')
  
  router.get('/', ensureGuest ,(req, res) => {
      res.render('login')
    })
  
  router.get("/log",ensureAuth, async(req,res)=>{
      res.render('index',{userinfo:req.user})
  })

module.exports = router;
