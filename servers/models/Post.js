const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  media: { type: String }, // URL de l'image ou de la vidéo associée au post
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Utilisateurs qui ont aimé ce post
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Références aux commentaires
  createdAt: { type: Date, default: Date.now },
  //visibilité des publications

  visibility: {
    type: String,
    enum: ["public", "friends", "private"],
    default: "public",
  },

  // tages ou mentions

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  // localisation

  location: {
    type: String,
    trim: true,
  },

  //   garder une trace du nombre de vues

  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Post", postSchema);
