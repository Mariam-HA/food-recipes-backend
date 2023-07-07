express = require('express')
const passport = require('passport');
const { createCategory, getCategory, getCatById, deleteCat } = require("./category.controllers")
require("dotenv").config()
router = express.Router()

router.get('/', getCategory)
router.post('/', passport.authenticate('jwt', { session: false }), createCategory)
router.get('/:categoryId', passport.authenticate('jwt', { session: false }), getCatById)
router.delete('/:categoryId', passport.authenticate('jwt', { session: false }), deleteCat)
module.exports = router