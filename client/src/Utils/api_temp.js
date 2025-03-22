//const API_URL = "http://localhost:4000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  // Affichage du token dans la console pour vérifier
  console.log("🔑 Token envoyé avec la requête :", token);

  if (!token) {
    console.error("❌ Aucun token trouvé dans localStorage.");
    throw new Error("Token manquant. Veuillez vous reconnecter.");
  }

  try {
    const response = await fetch(`http://localhost:4000/api${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers, // Permet d'ajouter d'autres en-têtes si nécessaire
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Erreur API :", errorData);
      throw new Error(errorData.message || "Erreur API inconnue");
    }

    return response;
  } catch (error) {
    console.error("❌ Erreur lors de l'appel API :", error);
    throw error; // Permet de relancer l'erreur pour la gérer plus haut
  }
};


