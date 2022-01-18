const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("app");
const api = supertest(app);

const helper = require("./helpers/users_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

describe("Users API", () => {
  beforeEach(async () => {
    // clear testing-DB and add a single "root" user
    await User.deleteMany();
    const passwordHash = await bcrypt.hash("pawword:3", 10);
    const user = new User({
      username: "pelos-root",
      name: "pelos",
      passwordHash: passwordHash,
    });
    await user.save();
  });

  /// GET /api/users
  test("should retrieve users as JSON with status 200", async () => {
    await api
      .get("/api/users/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("should retrive existing users as JSON with status 200", async () => {
    const response = await api("/api/users/").expect(200);

    // initially, there is only one user, which we added in beforeEach() above
    expect(response.body.name).toBe("pelos");
    expect(response.body).toHaveLength(1);
  });

  // POST /api/users
  test("should post a new user with status 201", async () => {
    const newUser = {
      name: "patiti",
      username: "laPata",
      password: "ilovevaka",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const notesInDB = await helper.usersInDB();

    // Check a new entry was added
    expect(notesInDB).toHaveLength(2);
    const contents = notesInDB.map((user) => user.name);
    // Check if the entry contains the user we added
    expect(contents).toContain("patiti");
  });

  // status code 422 - Unprocessable Entity
  test("should fail (422) to post a new user if username or name are invalid", async () => {
    // Validation of username and name is handled by mongoose (see user.model)
    // both username and name must be at least 3 characters long and are required
    const invalidUsername = {
      username: "a",
      name: "bbbbb",
      password: "ccccc",
    };
    const invelidName = {
      username: "aaaaa",
      name: "b",
      password: "ccccc",
    };

    let resp = await api
      .post("/api/users")
      .send(invalidUsername)
      .expect(422)
      .expect("Content-Type", /application\/json/);

    expect(resp);
  });

  test("should fail (422) to post a new user if password is too short", async () => {
    // Validation of password is handled by us with express (see user.controller)
    // password validation fails if there is no password included or if it
    // is less than 3 characters long
  });

  test("should fail (422) to post a new user if username already exists", async () => {
    // Validation of username handled by mongoose (user.model)
    // validation fails if the username (but not name) is already being used
    // by another document in the Database
  });

  // DELETE /api/users/:userId

  // PUT /api/users/:userId
});

afterAll(() => {
  mongoose.connection.close();
});
