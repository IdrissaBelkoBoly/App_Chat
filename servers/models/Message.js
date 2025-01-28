const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // savoir si le destinateur à lu le message

  isRead: { 
  type: Boolean, 
  default: false 
},

  // permettre l'envoi des fichiers dans le messages

  attachments: [{ 
  type: String // URLs des fichiers joints 
}],

  // identifier le type de message
  messageType: {
    type: String,
    enum: ["text", "image", "video", "file"],
    default: "text",
  },
});

module.exports = mongoose.model("Message", messageSchema);
