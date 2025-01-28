const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Utilisateurs qui ont aimé ce commentaire
  createdAt: { type: Date, default: Date.now },
  //permettre aux utilisateurs de repondre aux commentaires

  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

  //ajouter un compteur de signalements

  reports: { 
  type: Number, 
  default: 0 
},

  // suivre si le commentaire a été modifié

  isEdited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
