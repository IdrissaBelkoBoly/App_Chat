const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  media: { type: String, required: true }, // Image ou vidéo de la story
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }, // Date d'expiration de la story
  // suivre qui à vu l'story

  views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  //ajouter des interactions ou des commentaires sur les sotries

  reactions: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["like", "love", "wow", "sad", "angry"] },
  },
],

  // ajouter un statu pour savoir si une story à été archivée

  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Story", storySchema);
