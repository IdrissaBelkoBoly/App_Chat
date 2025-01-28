const express = require("express");
const {
  getNotifications,
  markAsRead,
  deleteNotification,
} = require("../controllers/notificationController");
const router = express.Router();

router.get("/", getNotifications); // Récupérer toutes les notifications
router.put("/:id", markAsRead); // Marquer une notification comme lue
router.delete("/:id", deleteNotification); // Supprimer une notification

module.exports = router;
