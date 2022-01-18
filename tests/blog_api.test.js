const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./helpers/blog_helper");

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(helper.initialBlogs);
});

// GET /api/blogs
describe("Viewing existing blogs in DB", () => {
  test("returns the blogs as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns all blogs stored in the database", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a returned blog has an 'id' property", async () => {
    const response = await api.get("/api/blogs");
    const exampleBlog = response.body[0];
    expect(exampleBlog.id).toBeDefined();
  });
});

// POST /api/blogs

describe("Adding new blogs", () => {
  test("new blogs are successfully created", async () => {
    await api.post("/api/blogs").send(helper.singleBlog);

    const blogsAtEnd = await helper.blogsInDB();
    // added a new blog
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    // verify the contents of the added blog
    expect(blogsAtEnd[blogsAtEnd.length - 1].title).toEqual(
      helper.singleBlog.title
    );
    expect(blogsAtEnd[blogsAtEnd.length - 1].author).toEqual(
      helper.singleBlog.author
    );
    expect(blogsAtEnd[blogsAtEnd.length - 1].url).toEqual(
      helper.singleBlog.url
    );
  });

  test("if the 'likes' property is missing, sets the default value to 0", async () => {
    const blogWithNoLikes = {
      title: helper.singleBlog.title,
      author: helper.singleBlog.author,
      url: helper.singleBlog.url,
    };

    await api.post("/api/blogs").send(blogWithNoLikes);

    const blogsAtEnd = await helper.blogsInDB();
    const newBlog = blogsAtEnd[blogsAtEnd.length - 1];

    expect(newBlog.likes).toBeDefined();
    expect(newBlog.likes).toBe(0);
  });

  test("if the 'title' and 'url' properties are missing, fail with status 422", async () => {
    const incompleteBlog = {
      author: "jorch",
      likes: 2,
    };

    // This throws a Validation Error, which I am handling with status 422 now
    await api.post("/api/blogs").send(incompleteBlog).expect(422);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

// DELETE /api/blogs/id
describe("Deleting an existing blog by id", () => {
  test("should suceed with status code 204 if id is valid and of an existing blog", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test("should fail with status code 400 id id is invalid or non-existing", async () => {
    await api.delete(`/api/blogs/123a`).expect(400);
  });
});

// PUT /api/blogs/id
describe("Updating an existing blog by id", () => {
  test("should succeed with status code 204 if id is valid and of an existing blog", async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      title: "UPDATED BLOG",
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDB();
    const resultingBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    expect(resultingBlog.title).toEqual("UPDATED BLOG");
  });

  test("should fail with status code 400 if id is invalid or non-existing", async () => {
    const failingBlog = {
      title: "TEST",
      author: "AUTHOR",
      URL: "URL",
    };

    await api.put(`/api/blogs/${"123qweasd"}`).send(failingBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
