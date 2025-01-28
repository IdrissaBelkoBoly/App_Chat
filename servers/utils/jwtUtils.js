const jwt = require("jsonwebtoken");

const secretKey = "votre_secret_key"; // Utilisez une clé secrète forte et gardez-la confidentielle
const expiresIn = "24h"; // Durée de validité des tokens

// Générer un token JWT
const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Vérifier et décoder un token JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Token invalide ou expiré");
  }
};

// Extraire l'utilisateur à partir du token dans l'en-tête Authorization
const extractUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Token manquant ou mal formé");
  }

  const token = authHeader.split(" ")[1];
  return verifyToken(token);
};

module.exports = { generateToken, verifyToken, extractUserFromToken };
