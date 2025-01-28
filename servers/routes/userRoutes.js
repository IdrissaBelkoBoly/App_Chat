const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware , getUsers); // Récupérer tous les utilisateurs
router.get("/:id", authMiddleware , getUserById); // Récupérer un utilisateur par ID
router.post("/", createUser); // Créer un utilisateur
router.put("/:id", authMiddleware , updateUser); // Mettre à jour un utilisateur
router.delete("/:id", authMiddleware , deleteUser); // Supprimer un utilisateur

module.exports = router;
