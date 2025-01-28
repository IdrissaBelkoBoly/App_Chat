// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  // information sur le profile
  profilePicture: { type: String, default: "default-profile.png" },
  bio: { type: String, maxlength: 150 },
  location: { type: String },

  // si votre app a des rôles admin,utilisateur normal etc....
  role: { type: String, enum: ["user", "admin"], default: "user" },

  // si vous voulez suivre si l'utilisateur est en ligne ou hors ligne
  isOnline: { type: Boolean, default: false },

  // Amis et Abonnées
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  //si votre application utilise un systeme de notificatio
  notifications: [
    {
      type: String,
      message: String,
      isRead: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],

  // un champ pour la reinitialisation de mot de passe et historique de connexion
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  //date de dernière connexion 
  lastLogin: { type: Date },
  // si votre app a des paramètres personnalisé
  settings: {
    theme: { type: String, default: "light" },
    privacy: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
