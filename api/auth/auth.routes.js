const express = require("express");
const { getUser, signin, signup } = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

router.param("userId", param);

router.get("/", passport.authenticate("jwt", { session: false }), getUser);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
