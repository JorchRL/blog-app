const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response, next) => {
  console.log("get /");
  Blog.find({})
    .then((blogs) => response.json(blogs))
    .catch((e) => next(e));
});

blogsRouter.post("/", (request, response, next) => {
  console.log("post /");
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => response.status(201).json(result))
    .catch((e) => next(e));
});

module.exports = blogsRouter;
