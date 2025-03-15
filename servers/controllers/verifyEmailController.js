const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Fonction pour vérifier l'email
const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Token manquant" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email déjà vérifié" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email vérifié avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    res
      .status(500)
      .json({ message: "Lien de vérification invalide ou expiré" });
  }
};

module.exports = { verifyEmailController };
