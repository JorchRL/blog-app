const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // Should return the sum of likes of all blog posts in the blogs array

  return blogs.length === 0
    ? 0
    : blogs.length === 1
    ? Number(blogs[0].likes)
    : blogs.map((blog) => blog.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlog = () => {};

const mostBlogs = () => {};

const mostLikes = () => {};

module.exports = {
  dummy,
  totalLikes,
};
