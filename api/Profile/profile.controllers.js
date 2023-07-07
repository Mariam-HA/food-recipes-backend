const Recipe = require("../../models/Recipes");

exports.getOneProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const profile = await Recipe.findById(userId).populate("Recipe");
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
