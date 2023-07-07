const express = require("express");
const { getOneProfile } = require("../auth/auth.controllers");
const router = express.Router();
const passport = require("passport");
const { param } = require("../../utils/params/param");

router.get("/:userId", getOneProfile);

module.exports = router;
