express = require('express')
const passport = require('passport');
const { getIngredents, createIngredent } = require('./ingredients.controller');

const router = express.Router()

router.get("/ingredent", getIngredents)
router.post("ingredent", createIngredent)
module.exports = router