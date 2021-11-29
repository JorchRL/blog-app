const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./blog_helper");

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(helper.initialBlogs);
});

// GET /api/blogs
test("returns the blogs as json", async () => {
  // the database is seeded the blogs in helper.initialBlogs
  // This test should retrieve the blogs from the database and:
  // 1. check that they are correctly formatted as json
  // 2. check that all blogs are correctly retrieved

  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("returns all notes stored in the database", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test.only("a returned blog has an 'id' property", async () => {
  const response = await api.get("/api/blogs");
  // console.log(response.body[0]);
  const exampleBlog = response.body[0];
  expect(exampleBlog.id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
