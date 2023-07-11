const express = require("express");
const { getProfile } = require("../Profile/profile.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

// router.get("/:userId", getOneProfileById);
router.get("/", getProfile);

module.exports = router;
