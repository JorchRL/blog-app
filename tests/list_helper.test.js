const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);

    expect(result).toBe(1);
  });
});

describe.only("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "123",
      title: "How to make a million dollars writing tests!",
      author: "Me :3",
      url: "www.katitos.art/blogs/123",
      likes: "10",
      __v: "0",
    },
  ];

  test("when the list has just one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(10); // our dummy blog above has 10 likes
  });
});
