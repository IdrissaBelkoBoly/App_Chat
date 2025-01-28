const express = require("express");
const {
  getMessages,
  sendMessage,
  deleteMessage,
} = require("../controllers/messageController");
const router = express.Router();

router.get("/", getMessages); // Récupérer tous les messages
router.post("/", sendMessage); // Envoyer un message
router.delete("/:id", deleteMessage); // Supprimer un message

// Nouvelle route : Récupérer les messages entre deux utilisateurs
router.get("/:userId/:recipientId", async (req, res) => {
  const { userId, recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId },
      ],
    }).sort({ createdAt: 1 }); // Trier par date croissante

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des messages", error });
  }
});

module.exports = router;
