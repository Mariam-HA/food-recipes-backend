const express = require("express");
const {
  getUser,
  signin,
  signup,
  deleteUser,
  deleteAll,
} = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");

const { param } = require("../../utils/params/param");

const jwtAuthenticate = passport.authenticate("jwt", { session: false });
const localAuthenticate = passport.authenticate("local", { session: false });

router.param("userId", param);

router.get("/", jwtAuthenticate, getUser);

router.post("/signup", uploader.single("userImage"), signup);

router.post(
  "/signin",
  localAuthenticate,
  signin
);

router.delete("/:userId", deleteUser);

router.delete("/", deleteAll);

module.exports = router;
