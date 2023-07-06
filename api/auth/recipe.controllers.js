const Categories = require("../../models/Category");
const Recipes = require("../../models/Recipes");

exports.getAllRecipies = async (req, res, next) => {
  try {
    const recipies = await Recipe.find().populate("Category Ingredient");
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.getOneRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId).populate(
      "Category Review Ingredient"
    );
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};
