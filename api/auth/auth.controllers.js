const User = require("../../models/User");
const passHash = require("../../utils/auth/passhash");
const generateToken = require("../../utils/auth/generateToken");

exports.getUser = async (req, res, next) => {
  try {
    const users = await User.find(); //.select("-__v");
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    //encrypt the password
    const { password } = req.body;
    req.body.password = await passHash(password, next);
    //assign false to staff to diffrentiate between staff and normal users

    //create user with encrypted password

    const newUser = await User.create(req.body);
    //create token
    const token = generateToken(newUser, next);

    return res.status(201).json({ token });
  } catch (err) {
    //  res.status(500).json("Server Error");
    return next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user, next);
    return res.status(200).json({ token });
  } catch (err) {
    // return res.status(500).json(err.message);
    return next(err);
  }
};
