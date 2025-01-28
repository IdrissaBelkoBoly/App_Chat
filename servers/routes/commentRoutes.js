const express = require("express");
const {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateMiddleware = require("../middlewares/validateMiddleware");

const router = express.Router();

router.get("/",authMiddleware, getComments); // Récupérer tous les commentaires
router.get("/:id",authMiddleware, getCommentById); // Récupérer un commentaire par ID
router.post("/", authMiddleware,validateMiddleware, createComment); // Ajouter un commentaire
router.put("/:id",authMiddleware,validateMiddleware, updateComment); // Mettre à jour un commentaire
router.delete("/:id",authMiddleware, deleteComment); // Supprimer un commentaire

module.exports = router;
