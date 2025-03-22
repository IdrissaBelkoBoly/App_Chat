import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Link , useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password){
      alert("Veuillez remplir tous les champs");
      return;
    }
     
     console.log("Données envoyées:",{email, password});
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Reponse du serveur :" , data);

      if (response.ok) {


        
        console.log("Token reçu :", data.token); // Vérifie que le token est bien reçu
        localStorage.setItem("token", data.token); // Stocke le token dans le Local Storage
        console.log(
          "Token stocké dans localStorage :",
          localStorage.getItem("token")
        ); // Vérifie si le token est bien stocké

        login(data.token); // Stocke le token avec le contexte

        console.log(localStorage.getItem("token")); // Vérifie si le token est stocké dans le localStorage

        navigate("/Dashboard"); // Redirige vers le tableau de bord
        // window.location.href = "/Dashboard";
      } else {
        console.log("Erreur de connexion :" ,data.message);
        alert(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Se connecter</button>
        </form>
        <p>
          Pas encore de compte ? <Link to="/register">Inscris-toi ici</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
