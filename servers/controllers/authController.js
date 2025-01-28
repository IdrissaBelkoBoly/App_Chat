const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Assurez-vous que le modèle User existe

// Contrôleur pour gérer la connexion
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Token généré :", token);

    // Retourner le token au client
    res.status(200).json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res
      .status(500)
      .json({ message: "Erreur serveur, veuillez réessayer plus tard." });
  }
};

module.exports = { loginController };
