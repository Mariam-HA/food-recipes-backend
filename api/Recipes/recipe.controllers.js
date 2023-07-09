const Category = require("../../models/Category");
// const Categories = require("../../models/Category");
const Recipe = require("../../models/Recipe");

exports.getAllRecipies = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate(
      "Category Ingredient User Review"
    );
    res.status(200).json(recipes);
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

  // exports.deleteRecipe = async (req, res, next) => {
  //   try {
  //     await Recipe.findByIdAndDelete({ _id: req.recipe.id });
  //     return res.status(204).end();
  //   } catch (error) {
  //     return next(error);
  //   }
  // };
};
exports.deleteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { categoryId } = req.params;
    if (req.user === true) {
      req.body.createdBy = req.user._id;

      const category = await Category.findBtId(categoryId);
      const recipe = await Recipe.findById(recipeId);

      if (category && recipe) {
        await recipe.updateOne({
          $pop: { recipe: recipeId },
        });

        await category.updateOne({
          $pop: { category: categoryId },
        });
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Category or Recipe not found" });
      }
    } else {
      res.status(401).json({
        message:
          "thise user  not registered and not allowed to delete a recipe!",
      });
    }
  } catch (error) {
    next(error);
  }
};