express = require("express");
const passport = require("passport");
const Ingredient = require("../../models/Ingredient");
const {
  createIngredent,
  deleteIngredentById,
  getAllIngredents,
  addIngredientToRecipe,
  addNewIngredientToRecipe,
  addExistingIngredientToRecipe,
} = require("./ingredients.controller");

require("dotenv").config();

const router = express.Router();

const signedIn = passport.authenticate("jwt", { session: false });

router.param("ingredentId", async (req, res, next, ingredentId) => {
  try {
    const ingredient = await Ingredient.findById(ingredentId);
    if (!ingredient)
      return res.status(404).json({
        message: " no ingredent matches that ID!",
      });
    req.ingredient = ingredient;
    next();
  } catch (error) {
    next(error);
  }
});

router.get("/", getAllIngredents);

router.post("/", signedIn, createIngredent);

// add new ingredient to recipe
router.post("/:recipeId", signedIn, addNewIngredientToRecipe);

// add existing ingredient to recipe
router.post(
  "/:recipeId/:ingredientId",
  signedIn,
  addExistingIngredientToRecipe
);

router.delete("/:ingredentId", signedIn, deleteIngredentById);

module.exports = router;

// router.post('/:recipeId/ingredients', addIngredientToRecipe);
//router.post("/:recipeId", signedIn, addIngredientToRecipe);
