const router = require("express").Router();

const {
  getAllUsers,
  postNewUser,
} = require("../controllers/users.controller");

// Router: /api/users/

router.get("/", getAllUsers);

router.post("/", postNewUser);

module.exports = router;
