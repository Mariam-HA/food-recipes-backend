const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); //to fetches all users from the database but omits the password field in the returned documents.
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    //encrypt the password
    const { password } = req.body;
    req.body.password = await passHash(password);

    //create user with encrypted password
    if (req.file) {
      req.body.userImage = `${req.file.path}`;
    }

    const newUser = await User.create(req.body);
    //create token
    const token = generateToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
}; //

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndRemove({ _id: req.user.id });
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    // Delete all
    await User.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
