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

const favoriteBlog = (blogs) => {
  // we also need to format the returned object

  if (blogs.length === 0) {
    return {
      title: "",
      author: "",
      url: "",
      likes: "",
    };
  }

  const favorite = blogs.reduce((prev, curr) =>
    prev.likes < curr.likes ? curr : prev
  );

  return {
    title: favorite.title,
    author: favorite.author,
    url: favorite.url,
    likes: Number(favorite.likes),
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: "",
      blogs: 0,
    };
  }

  const authorWithMostBlogs = {
    author: "",
    blogs: 0,
  };

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {
      author: "",
      likes: 0,
    };
  }

  const authorWithMostLikes = {
    author: "",
    likes: 0,
  };

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
