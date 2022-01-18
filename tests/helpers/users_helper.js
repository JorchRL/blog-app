const User = require("../../models/user.model");

/**
 * Creates and removes an user from the database, and returns its Id
 * @returns {string} the non-existing user Id
 */
const nonExistingUserId = async () => {
  const ghostUser = new User({
    name: "patiti",
    username: "pat",
    password: "ilovevaka",
  });
  await ghostUser.save();
  await ghostUser.remove();

  return ghostUser._id.toString();
};

/**
 * Retrieve all users from the database.
 * @returns {User[]} an array of the users (in JSON format) in the DB
 */
const usersInDB = async () => {
  const users = await User.find();
  return users.map((user) => user.toJSON());
};

module.export = {
  usersInDB,
  nonExistingUserId,
};
