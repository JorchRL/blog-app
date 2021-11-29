const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// This is our blog api, handled with an express router

// GET all blogs
blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

// POST new blog
blogsRouter.post("/", async (request, response, next) => {
  try {
    const newBlog = new Blog(request.body);
    const saveResult = await newBlog.save();
    response.status(201).json(saveResult);
  } catch (error) {
    console.log(error.name);
    next(error);
  }
});

module.exports = blogsRouter;
