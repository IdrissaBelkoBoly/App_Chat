const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },

  // supprimer ou annuler les demandes àprès une certaine période

  expiresAt: { 
  type: Date 
},

  // garder une trace des dates pour le changement de statut

  actionHistory: [
    {
      action: { type: String, enum: ["sent", "accepted", "declined"] },
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("FriendRequest", friendRequestSchema);
