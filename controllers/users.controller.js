const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const postNewUser = async (req, res, next) => {
  // validate password here as it never reaches any mongoose validators
  if (!req.body.password || req.body.password.length < 3) {
    return res.status(422).json({
      error:
        "User validation failed: password must be at least 3 characters long",
    });
  }

  const body = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await user.save();
    // status code 201 - Created
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  postNewUser,
};
