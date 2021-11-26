const listHelper = require("../utils/list_helper");
const blogTestCases = require("./blog_test_cases");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);

    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  const { listWithOneBlog, blogs } = blogTestCases;

  test("when list is empty, equals 0", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when the list has just one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(10); // our dummy blog above has 10 likes
  });

  test("when the list has many blogs, equals the sums of the likes of each", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe.only("favoriteBlog", () => {
  test("when list has many blogs, returns the one with most likes", () => {
    const result = listHelper.favoriteBlog(blogTestCases.blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    });
  });

  test("when list has only one blog, returns it", () => {
    const result = listHelper.favoriteBlog(blogTestCases.listWithOneBlog);
    expect(result).toEqual({
      title: "How to make a million dollars writing tests!",
      author: "Me",
      url: "www.katitos.art/blogs/123",
      likes: 10,
    });
  });

  test("when list is empty, returns an empty blog", () => {});
});

describe.only("mostBlogs", () => {
  test("when list has many blogs, returns the author with most blogs", () => {
    const result = listHelper.mostBlogs(blogTestCases.blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("when list has only one blog, returns its author", () => {
    const result = listHelper.mostBlogs(blogTestCases.listWithOneBlog);
    expect(result).toEqual({
      author: "Me",
      blogs: 1,
    });
  });

  test("when list is empty, return an empty author object", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual({
      author: "",
      blogs: 0,
    });
  });
});

describe.only("mostLikes", () => {
  test("when list has many blogs, return the author with most likes", () => {
    const result = listHelper.mostLikes(blogTestCases.blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
  test("when list has only one blog, return its author", () => {
    const result = listHelper.mostLikes(blogTestCases.listWithOneBlog);
    expect(result).toEqual({
      author: "Me",
      likes: 10,
    });
  });
  test("when list has many blogs, return the author with most likes", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toEqual({
      author: "",
      likes: 0,
    });
  });
});
