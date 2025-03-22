/*import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Pour gérer le chargement

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:4000/api/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
          setLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;*/


import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")); // Utiliser 'token' au lieu de 'isAuthenticated'
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement

  // 🔄 Récupération du token dès le montage (AVANT la vérification)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("🔄 Récupération du token au montage :", storedToken);

    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Exécuté une seule fois au montage

  // Vérifie si le token est valide lorsque le composant est monté
  useEffect(() => {
    console.log("AuthContext monté, token actuel:", token);
    if (token) {
      // Vérifier le token auprès du backend
      fetch("http://localhost:4000/api/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoie le token dans les en-têtes
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ Réponse de vérification du token :", data);
          if (/*data.valid*/ data.message == "Token valide.") {
            console.log("✅ Token accepté, accès autorisé !");
            setLoading(false); // Token valide, continuer
          } else {
            console.warn("❌ Token invalide, suppression.");
            // Si le token est invalide, supprime-le et réinitialise le state
            localStorage.removeItem("token");
            setToken(null);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("⚠️ Erreur lors de la vérification du token :", error);
          setToken(null); // En cas d'erreur, réinitialiser le token
          setLoading(false);
        });
    } else {
      setLoading(false); // Si pas de token, fin du chargement
    }
  }, [token]); // Effect à exécuter quand le token change

  // Fonction de connexion
  const login = (newToken) => {
    console.log("Connexion réussie , stockage du token :", newToken);
    setToken(newToken); // Sauvegarder le token dans l'état
    localStorage.setItem("token", newToken); // Sauvegarder le token dans le localStorage
  };

  // Fonction de déconnexion
  const logout = () => {
    console.log("Déconnexion , suppression du token.");
    setToken(null); // Réinitialise l'état
    localStorage.removeItem("token"); // Supprime le token du localStorage
  };

  // Rendre le contexte avec le token, login, logout et l'état de chargement
  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

