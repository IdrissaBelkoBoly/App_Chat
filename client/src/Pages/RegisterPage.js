import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    age: "",
    nationality: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("Mise à jour du formulaire :",formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // ajout
     if (!formData.firstname || !formData.age || !formData.nationality) {
       setError("Tous les champs sont obligatoires !");
       setLoading(false);
       return;
     }
     
    console.log("Données envoyées :", formData);
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Une erreur est survenue");

      alert("Inscription réussie ! Vérifiez votre email.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      < div className= "auth-box">
      <h2>Inscription</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstname"
          placeholder="Prénom"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Âge"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nationalité"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
      <p className="login-link">
        Déjà inscrit ? <Link to="/login">Connecte-toi ici</Link>
      </p>
      </div>
    </div>
  );
};

export default Register;
