const Notification = require("../models/Notification");

// Récupérer toutes les notifications d'un utilisateur
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId });
    res.status(200).json(notifications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des notifications" });
  }
};

// Créer une notification
const createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de la notification" });
  }
};

// Supprimer une notification
const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification supprimée avec succès" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la notification" });
  }
};

// Marquer une notification comme lue
const markAsRead = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true } // Retourne la notification mise à jour
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification non trouvée" });
    }
    res.status(200).json(updatedNotification);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la notification" });
  }
};

module.exports = { getNotifications, createNotification, deleteNotification,markAsRead };
