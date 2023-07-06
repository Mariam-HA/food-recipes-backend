const { fetchUser } = require("./fetchUser");

exports.param = async (req, res, next, userId) => {
  try {
    const foundUser = await fetchUser(userId, next);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.subuser = foundUser;
    next();
  } catch (error) {
    return next(error);
  }
};
