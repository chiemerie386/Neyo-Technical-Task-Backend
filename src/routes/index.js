var express = require('express');
var router = express.Router();
const authRoutes = require('./auth-routes')

/* GET users listing. */
router.use('/auth', authRoutes)
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
