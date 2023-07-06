const express = require("express");
const { getUser, signin, signup } = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

const signedIn = passport.authenticate("jwt", { session: false });

router.param("userId", param);

router.get("/", signedIn, getUser);
router.post("/signup", signup);
router.post("/signin", signedIn, signin);

module.exports = router;
