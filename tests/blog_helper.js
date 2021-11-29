const Blog = require("../models/blog");

const initialBlogs = require("./blog_test_cases").blogs;

const singleBlog = {
  title: "test blog",
  author: "jorch",
  url: "www.katitos.art",
  likes: 0,
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
  singleBlog,
};
