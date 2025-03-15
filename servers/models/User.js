// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  firstname: {type: String, required: true},
  age: {type: Number, required: true},
  nationality: {type: String, required: true},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // ✅ Ajout du champ ici
  verificationToken: {type: String},// verification du mail

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

const bcrypt = require("bcryptjs");

// Méthode pour comparer le mot de passe entré avec celui stocké en base
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Avant de sauvegarder, hacher le mot de passe si modifié
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


module.exports = mongoose.model("User", userSchema);
