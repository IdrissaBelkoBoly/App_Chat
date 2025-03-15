const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header reçu :", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé, token manquant" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extrait :", token); // <-- Vérification du token extrait

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token décodé :", decoded);
    req.user = decoded; // Stocke les données utilisateur pour une utilisation future
    next();
  } catch (err) {
    console.error("Erreur lors de la vérification du token:", err.message);
    res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
