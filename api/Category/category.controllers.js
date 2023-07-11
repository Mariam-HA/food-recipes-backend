const Category = require("../../models/Category");

const createCategory = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.catImage = `${req.file.path}`;
    }
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    console.log(req.user);

    const category = await Category.find();
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};
const getCatById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (category) {
      return res.status(200).json(category);
    }
    res.status(404).json({ message: "Category not found" });
  } catch (error) {
    next(error);
  }
};
const deleteCat = async (req, res, next) => {
  try {
    const { categoryId } = req.params;


    const category = await Category.findById(categoryId)

    if (category.recipes.length > 0) {
      return res.status(401).json({ message: "you can't delete this category!" });
    }
    await category.deleteOne();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory, getCategory, getCatById, deleteCat };
