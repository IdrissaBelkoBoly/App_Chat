const Comment = require("../models/Comment");

// Récupérer tous les commentaires
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate(
      "author",
      "username profilePicture"
    );
    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commentaires" });
  }
};

// Récupérer un commentaire par ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "author",
      "username profilePicture"
    );
    if (!comment)
      return res.status(404).json({ message: "Commentaire non trouvé" });
    res.status(200).json(comment);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du commentaire" });
  }
};

// Ajouter un commentaire
const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création du commentaire" });
  }
};

// Mettre à jour un commentaire
const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour du commentaire" });
  }
};

// Supprimer un commentaire
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du commentaire" });
  }
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
