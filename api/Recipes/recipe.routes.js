const express = require("express");

const {
  getAllRecipies,
  deleteRecipe,
  getOneRecipe,
  createRecipe,
} = require("../Recipes/recipe.controllers");

const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/:recipeId", getOneRecipe);

router.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
router.get("/", getAllRecipies);

router.post("/", createRecipe);

module.exports = router;
