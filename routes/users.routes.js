const router = require("express").Router();
const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const {
  getAllUsers,
  postNewUser,
} = require("../controllers/users.controller");

router.get("/", getAllUsers);

router.post("/", postNewUser);

module.exports = router;
