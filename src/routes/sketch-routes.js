var express = require('express');
var router = express.Router();
const sketchController = require("../controllers/sketch-controller")
const authorizeUser = require("../middlewares/auth")
const validation = require('../middlewares/joi-validation')
const {createSketchSchema, updateSketchSchema} = require('../middlewares/validation-schemas/sketch-schema')

router.use(authorizeUser)
router.get('/getsketch/:sketchId',  sketchController.getOneSketch);
router.get('/getSketch',  sketchController.getSketch);
router.post('/create', validation(createSketchSchema), sketchController.createSketch);
router.post('/join/:sketchId', sketchController.joinSketch);
router.put('/update/:sketchId', validation(updateSketchSchema), sketchController.updateSketch);



module.exports = router;
