import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token , loading } = useContext(AuthContext); // Récupération du token depuis le contexte
  console.log("Dans ProtectedRoute : loading =",loading,",token =",token);
  
  if(loading){
    return <div>Chargement...</div>;
  }

  if (!token) {
    console.log("Redirection vers /login car token manquant");
    return <Navigate to="/login" />; // Redirige vers /login si aucun token n'est présent
  }
console.log("Acces autorisé au Dashboard");
  return children; // Si le token est présent, l'utilisateur accède au Dashboard
};

export default ProtectedRoute;
