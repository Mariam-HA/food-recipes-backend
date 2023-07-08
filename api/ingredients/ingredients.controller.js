const Ingredient = require("../../models/Ingredient");

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
