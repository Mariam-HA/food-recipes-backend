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
const upload = require("../../middlewares/uploader");

//router.param("userId", param);

router.get("/:recipeId", getOneRecipe);

router.delete(
  "/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
router.get("/", getAllRecipies);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("recipeImage"),
  createRecipe
);

module.exports = router;
