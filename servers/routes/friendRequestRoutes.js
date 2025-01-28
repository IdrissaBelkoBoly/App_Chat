const express = require("express");
const {
  getFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} = require("../controllers/friendRequestController");
const router = express.Router();

router.get("/", getFriendRequests); // Récupérer toutes les demandes d'amis
router.post("/", sendFriendRequest); // Envoyer une demande d'ami
router.put("/:id/accept", acceptFriendRequest); // Accepter une demande d'ami
router.put("/:id/reject", rejectFriendRequest); // Rejeter une demande d'ami

module.exports = router;
