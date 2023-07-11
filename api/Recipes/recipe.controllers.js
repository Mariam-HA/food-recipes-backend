const Category = require("../../models/Category");
const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");

exports.getAllRecipies = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate("categories ingredients");
    // .populate("User", "username");
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.recipeImage = `${req.file.path}`;
    }

    req.body.createdBy = req.user._id;

    let ingredients = req.body.ingredients;
    let categories = req.body.categories;

    const ingredients_len = await Ingredient.find({
      _id: ingredients,
    });
    const categories_len = await Category.find({
      _id: categories,
    });

    if (
      ingredients.length != ingredients_len.length ||
      categories.length != categories_len.length
    ) {
      return res
        .status(404)
        .json({ message: "ingredients or categories missing" });
    }

    const recipe = await Recipe.create(req.body);

    await req.user.updateOne({ $push: { recipes: recipe._id } });

    await Ingredient.updateMany(
      { _id: ingredients },
      {
        $push: { recipes: recipe._id },
      }
    );

    await Category.updateMany(
      { _id: categories },
      {
        $push: { recipes: recipe._id },
      }
    );

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.getOneRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId).populate(
      "categories reviews ingredients"
    );
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.categoryAdd = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { recipeId } = req.params;

    req.body.createdBy = req.user._id;

    const recipe = await Recipe.findById(recipeId);
    const category = await Category.findById(categoryId);

    if (recipe && category) {
      await recipe.updateOne({
        $push: { categories: categoryId },
      });

      await category.updateOne({
        $push: { recipies: recipeId },
      });

      res.status(204).end();
    } else {
      res.status(404).json({ message: "category or recipies not found" });
    }
  } catch (error) {
    next(error);
  }
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
