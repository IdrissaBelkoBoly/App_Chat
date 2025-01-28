const request = require("supertest");
const app = require("../server");
const Post = require("../models/Post");

describe("Post Routes", () => {
  afterEach(async () => {
    await Post.deleteMany();
  });

  it("devrait créer un nouveau post", async () => {
    const postData = {
      user: "userId123",
      title: "Test Post",
      content: "This is a test post",
    };

    const response = await request(app).post("/api/posts").send(postData);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Test Post");
  });

  it("devrait récupérer tous les posts", async () => {
    await Post.create({
      user: "userId123",
      title: "Post 1",
      content: "Content 1",
    });

    const response = await request(app).get("/api/posts");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("devrait supprimer un post", async () => {
    const post = await Post.create({
      user: "userId123",
      title: "Post to delete",
      content: "Content",
    });

    const response = await request(app).delete(`/api/posts/${post._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Post supprimé avec succès");
  });
});
