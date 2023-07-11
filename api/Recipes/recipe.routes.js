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

//router.param("userId", param);

router.get("/:recipeId", getOneRecipe);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);
router.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
router.get("/", getAllRecipies);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);

module.exports = router;
