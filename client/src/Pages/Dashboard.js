import React, { useEffect, useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import { apiRequest } from "../Utils/api_temp.js"; // Import de apiRequest

const Dashboard = () => {

  console.log(
    "Token actuel dans localStorage :",
    localStorage.getItem("token")
  );

  const { logout } = useContext(AuthContext);
  const [user, setUser] = useState(null); // Stocke les données de l'utilisateur

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiRequest("/users/me"); // Appelle l’API avec le token
        setUser(data); // Stocke les données récupérées
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
      }
    };

    fetchUserData(); // Exécute la fonction dès le montage du composant
  }, []);

  return (
    <div>
      <h1>Bienvenue dans votre tableau de bord</h1>
      {user ? (
        <p>Utilisateur connecté : {user.username}</p>
      ) : (
        <p>Chargement...</p>
      )}
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default Dashboard;
