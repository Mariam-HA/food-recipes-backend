const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");

exports.createIngredent = async (req, res, next) => {
  try {
    const existingIngredient = await Ingredient.findOne({
      name: req.body.name,
    });

    if (existingIngredient) {
      return res.status(400).json({ messge: "Ingredient alredy exists" });
    }
    const ingredient = await Ingredient.create(req.body);
    return res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.getAllIngredents = async (req, res, next) => {
  try {
    console.log(req.user);
    const ingredient = await Ingredient.find();
    return res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.deleteIngredentById = async (req, res, next) => {
  try {
    await req.ingredient.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.addNewIngredientToRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found!" });
    }

    const ingredient = await Ingredient.create(req.body);

    await Ingredient.findByIdAndUpdate(req.ingredient._id, {
      $push: { recipies: recipe._id },
    });

    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { ingredients: ingredient._id },
    });

    res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.addExistingIngredientToRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    const ingredient = await Ingredient.findById(ingredientId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found!" });
    }
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found!" });
    }

    await Ingredient.findByIdAndUpdate(req.ingredient._id, {
      $push: { recipies: recipe._id },
    });

    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { ingredients: ingredient._id },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
