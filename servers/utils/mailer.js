const nodemailer = require("nodemailer");

// Configuration de l'email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Votre email
    pass: process.env.EMAIL_PASS, // Mot de passe de votre email
  },
});

// Fonction pour envoyer un email de vérification
const sendVerificationEmail = (userEmail, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Vérification de votre email",
    html: `<p>Bonjour,</p>
           <p>Veuillez cliquer sur le lien suivant pour vérifier votre adresse email :</p>
           <a href="http://localhost:4000/api/auth/verify/${verificationToken}">Vérifier mon email</a>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
