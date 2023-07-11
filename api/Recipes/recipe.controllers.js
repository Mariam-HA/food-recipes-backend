const Category = require("../../models/Category");
const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");

exports.getAllRecipies = async (req, res, next) => {
  try {
    const recipes = await Recipe.find()
      .populate("categories ingredients reviews")
      .populate("User", "username");
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

    const ingredients = req.body.ingredients.map(async (ingredient) => {
      try {
        const ingred = await Ingredient.findById(ingredient);
        if (!ingred) {
          return res
            .status(404)
            .json({ message: "there is a missing ingredient" });
        }
        return ingred;
      } catch (error) {
        next(error);
      }
    });

    const categories = req.body.categories.map(async (category) => {
      try {
        const catego = await Category.findById(category);
        if (!catego) {
          return res
            .status(404)
            .json({ message: "there is a missing category" });
        }
        return catego;
      } catch (error) {
        next(error);
      }
    });

    const recipe = await Recipe.create(req.body);

    await req.user.updateOne({ $push: { recipes: recipe._id } });

    categories.forEach(async (category) => {
      await category.updateOne({ $push: { recipies: recipe._id } });
    });
    ingredients.forEach(async (ingredeint) => {
      await ingredeint.updateOne({ $push: { recipies: recipe._id } });
    });

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

  const createRecipe = async (req, res, next) => {
    try {
      const existingRecipe = await Recipe.findOne({
        name: req.body.name,
      });

      if (existingRecipe) {
        return res.status(400).json({ messge: "Recipe alredy exists!" });
      } else {
        if (req.file) {
          req.body.recipeImage = `${req.file.path}`;
        }
        const recipe = await Recipe.create(req.body);
        return res.status(201).json(recipe);
      }
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
