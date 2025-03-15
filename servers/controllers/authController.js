const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/mailer");
const crypto = require("crypto");
const User = require("../models/User"); // Assurez-vous que le modèle User existe

// Fonction pour l'inscription
const registerController = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer un utilisateur
    const user = new User({
      email,
      password,
      username,
      isVerified: false, // L'email doit être vérifié avant connexion
    });

    // Générer un token de vérification unique
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;

    // Sauvegarder l'utilisateur avec le token de vérification
    await user.save();

    // Envoyer l'email de vérification
    await sendVerificationEmail(user.email, verificationToken);

    return res.status(200).json({
      message: "Inscription réussie. Un email de vérification a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur, veuillez réessayer." });
  }
};

// Fonction pour la vérification de l'email
const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  try {
    // Chercher l'utilisateur avec ce token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Lien invalide ou expiré." });
    }

    // Marquer l'utilisateur comme vérifié
    user.isVerified = true;
    user.verificationToken = null; // Supprimer le token après vérification
    await user.save();

    return res.status(200).json({ message: "Email vérifié avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

// Contrôleur pour gérer la connexion
const loginController = async (req, res) => {
  const { email, password } = req.body;

  console.log("Données reçues :", { email, password });

  if (!email || !password) {
    console.log("Erreur : Email ou mot de passe manquant.");
    return res
      .status(400)
      .json({ message: "Email et mot de passe sont requis" });
  }

  try {
    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      console.log("Erreur : mot de passe incorrect.");
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifiez si l'email a été vérifié
    if (!user.isVerified) {
      console.log("Erreur : Email non vérifié.");
      return res.status(400).json({
        message: "Veuillez vérifier votre email avant de vous connecter",
      });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
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


const verifyTokenController = (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(400).json({ message: "Token manquant." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide." });
    }
    res.json({ message: "Token valide.", userId: decoded.id });
  });
};

module.exports = { registerController, verifyEmailController, loginController, verifyTokenController };
