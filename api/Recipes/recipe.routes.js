const express = require("express");
const {
  getAllRecipies,
  deleteRecipe,
  getOneRecipe,
} = require("../auth/auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

router.param("userId", param);

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

module.exports = router;
