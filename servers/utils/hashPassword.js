const bcrypt = require("bcrypt");

// Hacher un mot de passe
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Vérifier si un mot de passe correspond à son hash
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, verifyPassword };
