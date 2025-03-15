const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware"); // Middleware de protection

// Récupérer un profil utilisateur
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier un profil utilisateur
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { username, email, bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, bio },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
