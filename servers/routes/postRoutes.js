const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateMiddleware = require("../middlewares/validateMiddleware");

const router = express.Router();

router.get("/",authMiddleware, getPosts); // Récupérer tous les posts
router.get("/:id",authMiddleware, getPostById); // Récupérer un post par ID
router.post("/", authMiddleware, validateMiddleware, createPost); // Créer un post
router.put("/:id",authMiddleware,validateMiddleware, updatePost); // Mettre à jour un post
router.delete("/:id",authMiddleware, deletePost); // Supprimer un post

module.exports = router;
