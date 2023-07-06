express = require('express')
const passport = require('passport');
const { getIngredents, createIngredent } = require('./ingredients.controller');

const router = express.Router()

router.get("/", getIngredents)
router.post("/", createIngredent)
module.exports = router