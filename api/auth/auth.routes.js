const express = require("express");
const { getUser, signin, signup } = require("./auth.controllers");
const router = express.Router();
const passport = require("passport");
const uploader = require("../../middlewares/uploader");

const { param } = require("../../utils/params/param");

const jwt = passport.authenticate("jwt", { session: false });
const local = passport.authenticate("local", { session: false });

router.param("userId", param);
router.get("/", jwt, getUser);
router.post("/signup", uploader.single("userImage"), signup);
router.post("/signin", local, signin);

module.exports = router;
