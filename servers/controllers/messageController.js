const Message = require("../models/Message");

// Récupérer les messages entre deux utilisateurs
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.params.userId1, receiver: req.params.userId2 },
        { sender: req.params.userId2, receiver: req.params.userId1 },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
};

// Envoyer un message
const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'envoi du message" });
  }
};

// Supprimer un message
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du message" });
  }
};

module.exports = { getMessages, sendMessage, deleteMessage };
