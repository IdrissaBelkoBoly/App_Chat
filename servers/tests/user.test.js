const request = require("supertest");
const app = require("../server");
const User = require("../models/User");

describe("User Routes", () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });
  });

  it("devrait récupérer les informations d'un utilisateur", async () => {
    const response = await request(app).get("/api/users/testuser");
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("testuser");
  });

  it("devrait mettre à jour les informations d'un utilisateur", async () => {
    const updateData = { username: "updateduser" };

    const response = await request(app)
      .put("/api/users/testuser")
      .send(updateData);
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("updateduser");
  });

  it("devrait supprimer un utilisateur", async () => {
    const response = await request(app).delete("/api/users/testuser");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Utilisateur supprimé avec succès");
  });
});
