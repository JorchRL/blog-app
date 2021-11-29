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
    // console.log(error.name);
    next(error);
  }
});

// DELETE blog by id
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// PUT update a blog by id
blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const body = request.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(204).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
