const User = require("../../models/User");

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    return next(err);
  }
};
