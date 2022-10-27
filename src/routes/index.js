var express = require('express');
var router = express.Router();
const authRoutes = require('./auth-routes')
const sketchRoutes = require('./sketch-routes')
const userRoutes = require('./user-routes')

/* GET users listing. */
router.use('/auth', authRoutes)
router.use('/sketch', sketchRoutes)
router.use('/user', userRoutes)
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
