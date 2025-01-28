const request = require("supertest");
const app = require("../server"); // Chemin vers votre app Express
const User = require("../models/User");

describe("Auth Routes", () => {
  beforeEach(async () => {
    await User.deleteMany(); // Nettoyage des utilisateurs avant chaque test
  });

  it("devrait permettre à un utilisateur de s'inscrire", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };
    const response = await request(app)
      .post("/api/auth/register")
      .send(userData);
    expect(response.status).toBe(201);
    expect(response.body.email).toBe("testuser@example.com");
  });

  it("devrait permettre à un utilisateur de se connecter", async () => {
    const userData = {
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    };
    await request(app).post("/api/auth/register").send(userData);

    const response = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
