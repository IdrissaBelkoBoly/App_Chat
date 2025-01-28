const request = require("supertest");
const app = require("../server");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

describe("Comment Routes", () => {
  let postId;

  beforeAll(async () => {
    const post = await Post.create({
      title: "Test Post",
      content: "Some content",
    });
    postId = post._id;
  });

  afterEach(async () => {
    await Comment.deleteMany();
  });

  it("devrait permettre de créer un commentaire", async () => {
    const commentData = {
      postId,
      user: "userId123",
      content: "This is a test comment",
    };

    const response = await request(app).post("/api/comments").send(commentData);
    expect(response.status).toBe(201);
    expect(response.body.content).toBe("This is a test comment");
  });

  it("devrait récupérer les commentaires d'un post", async () => {
    await Comment.create({
      postId,
      user: "userId123",
      content: "Test comment",
    });

    const response = await request(app).get(`/api/comments/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
