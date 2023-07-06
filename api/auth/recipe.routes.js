const express = require("express");
const { getAllRecipies, getOneRecipe } = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/:recipeId", getOneRecipe);

router.get("/", getAllRecipies);

module.exports = router;
