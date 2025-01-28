const FriendRequest = require("../models/FriendRequest");

// Envoyer une demande d'ami
const sendFriendRequest = async (req, res) => {
  try {
    const newRequest = new FriendRequest({
      sender: req.user.id,
      receiver: req.body.receiver,
    });
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi de la demande d'ami" });
  }
};

// Accepter une demande d'ami
const acceptFriendRequest = async (req, res) => {
  try {
    const updatedRequest = await FriendRequest.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'acceptation de la demande d'ami" });
  }
};

// Rejeter une demande d'ami
const rejectFriendRequest = async (req, res) => {
  try {
    const updatedRequest = await FriendRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json(updatedRequest);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors du rejet de la demande d'ami" });
  }
};

// Récupérer toutes les demandes d'ami d'un utilisateur
const getFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find({
      receiver: req.user.id,
    }).populate("sender", "username profilePicture");
    res.status(200).json(friendRequests);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des demandes d'ami" });
  }
};

// Supprimer une demande d'ami
const deleteFriendRequest = async (req, res) => {
  try {
    await FriendRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Demande d'ami supprimée avec succès" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la demande d'ami" });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  deleteFriendRequest,
};
