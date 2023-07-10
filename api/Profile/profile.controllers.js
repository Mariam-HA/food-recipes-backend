const User = require("../../models/User");

exports.getOneProfileById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const profile = await Recipe.findById(userId).populate("Recipe Review");
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    // const { userId } = req.params;

    const profile = await User.findById(req.user._id).populate("Recipe Review");
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};
