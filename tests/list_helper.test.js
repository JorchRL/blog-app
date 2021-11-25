const listHelper = require("../utils/list_helper");
const blogTestCases = require("./blog_test_cases");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);

    expect(result).toBe(1);
  });
});

describe.only("total likes", () => {
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
