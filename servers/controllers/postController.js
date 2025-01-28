const Post = require("../models/Post");

// Récupérer tous les posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "username profilePicture"
    );
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des posts" });
  }
};

// Récupérer un post par ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username profilePicture"
    );
    if (!post) return res.status(404).json({ message: "Post non trouvé" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération du post" });
  }
};

// Créer un post
const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Le contenu est requis" });
  }

  try {
    const post = new Post({
      content,
      author: req.user.userId, // Utilisateur décodé depuis le token (grâce à authMiddleware)
    });

    if (req.file) {
      post.media = req.file.path; // Optionnel : Stocke le chemin du fichier si vous gérez des médias
    }

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la création du post", error });
  }
};


// Mettre à jour un post
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du post" });
  }
};

// Supprimer un post
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du post" });
  }
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
