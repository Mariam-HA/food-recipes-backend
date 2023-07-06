express = require('express')
const passport = require('passport');
const { createCategory, getCategory } = require("./category.controllers")
require("dotenv").config()
router = express.Router()

router.get('/', getCategory)
router.post('/', passport.authenticate('jwt', { session: false }), createCategory)

module.exports = router