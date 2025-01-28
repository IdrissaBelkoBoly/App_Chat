// Importation des modules nécessaires
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // Import Mongoose pour MongoDB
const http = require("http");  // Ajout pour créer le serveur HTTP
const { Server } = require("socket.io"); // Ajout pour Socket.IO

// Import des middlewares et des routes
const errorMiddleware = require("./middlewares/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const friendRequestRoutes = require("./routes/friendRequestRoutes");
const messageRoutes = require("./routes/messageRoutes");
const authRoutes = require('./routes/authRoutes'); // Assurez-vous que le chemin est correct


dotenv.config(); // Charge les variables d'environnement depuis un fichier .env

// Vérification de la variable JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined");
  process.exit(1); // Arrêtez l'application si la variable n'est pas définie
}

const app = express();

const server = http.createServer(app); // Utilisation de http.createServer
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Adresse du frontend
    methods: ["GET", "POST" ,"PUT", "DELETE"],
  },
});

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Middleware
app.use(cors({ origin: "http://localhost:3000"}));
app.use(express.json()); // Pour parser le JSON dans les requêtes

// Routes principales
app.use("/api/users", userRoutes); // Routes des utilisateurs
app.use("/api/posts", postRoutes); // Routes des posts
app.use("/api/comments", commentRoutes); // Routes des commentaires
app.use("/api/notifications", notificationRoutes); // Routes des notifications
app.use("/api/friend-requests", friendRequestRoutes); // Routes des demandes d'amis
app.use("/api/messages", messageRoutes); // Routes des messages
app.use("/api/auth", authRoutes); // Routes d'authentification



app.get("/api/status", (req, res) => {
  res.json({ message: "Backend is connected!" });
});


// Middleware pour la gestion des erreurs (doit être le dernier)
app.use(errorMiddleware);

// Définir une route de base
app.get("/", (req, res) => {
  console.log("server fonctionne:");
  res.send("Serveur MERN en fonctionnement !");
});

// Configuration Socket.IO
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté :", socket.id);

  socket.on("typing", ({ sender, recipient }) => {
    socket.to(recipient).emit("user-typing", sender);
  });

  socket.on("stop-typing", ({ recipient }) => {
    socket.to(recipient).emit("user-stopped-typing");
  });
});



// Démarrer le serveur
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur http://localhost:${PORT}`);
});
