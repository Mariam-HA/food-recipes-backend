express = require('express')
const passport = require('passport');
const { getIngredents, createIngredent } = require('./ingredients.controller');
require("dotenv").config()
const router = express.Router()

router.get("/", getIngredents)
router.post("/", passport.authenticate('jwt', { session: false }), createIngredent)
module.exports = router