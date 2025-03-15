const express = require("express");
const User = require("../models/User"); // ✅ Import du modèle User   nouvel ajout
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Ajout de l'endpoint /me
router.get('/me', authMiddleware, (req, res) => {
  const userId = req.user.id;  // ID de l'utilisateur depuis le token
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.json(user);  // Envoi des données de l'utilisateur
    })
    .catch(err => res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur', error: err }));
});


router.get("/", authMiddleware, getUsers); // Récupérer tous les utilisateurs
router.get("/:id", authMiddleware, getUserById); // Récupérer un utilisateur par ID
router.post("/", createUser); // Créer un utilisateur
router.put("/:id", authMiddleware, updateUser); // Mettre à jour un utilisateur
router.delete("/:id", authMiddleware, deleteUser); // Supprimer un utilisateur

module.exports = router;
