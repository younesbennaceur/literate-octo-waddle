import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "contact@tfcouverture.com",
      pass: "erhf eewa whmv uxoz",
    },
  });

// Fonction pour générer le HTML de l'email (pour l'entreprise)
function generateEmailHTML(formData) {
  const getProjetLabel = (value) => {
    const projets = {
      renovation: "Rénovation de toiture",
      isolation: "Isolation",
      charpente: "Charpente",
      fenetre: "Fenêtre de toit",
      demoussage: "Démoussage",
    };
    return projets[value] || value;
  };

  const getToitureLabel = (value) => {
    const toitures = {
      tuile: "Tuile",
      ardoise: "Ardoise",
      zinc: "Zinc",
      "bac-acier": "Bac acier",
      shingle: "Shingle",
    };
    return toitures[value] || value;
  };

  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
      .header { background-color: #0565C4; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
      .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
      .section { margin-bottom: 25px; border-bottom: 1px solid #e0e0e0; padding-bottom: 20px; }
      .section:last-child { border-bottom: none; }
      .section-title { font-size: 16px; font-weight: bold; color: #0565C4; margin-bottom: 12px; text-transform: uppercase; }
      .info-row { display: flex; justify-content: space-between; margin-bottom: 8px; padding: 8px 0; }
      .info-label { font-weight: bold; color: #555; width: 40%; }
      .info-value { color: #333; width: 60%; text-align: right; }
      .footer { background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 5px; margin-top: 20px; }
      .important { background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 12px; margin: 20px 0; border-radius: 3px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>🏠 Nouvelle Demande de Devis</h1>
        <p>Tf Couverture - Demande de RDV</p>
      </div>

      <div class="content">
        <p>Bonjour,</p>
        <p>Vous avez reçu une nouvelle demande de devis de la part d'un client.</p>

        <div class="section">
          <div class="section-title">📋 Informations personnelles</div>
          <div class="info-row"><span class="info-label">Nom :</span><span class="info-value">${formData.nom}</span></div>
          <div class="info-row"><span class="info-label">Prénom :</span><span class="info-value">${formData.prenom}</span></div>
          <div class="info-row"><span class="info-label">Adresse :</span><span class="info-value">${formData.adresse}, ${formData.codePostal} ${formData.ville}</span></div>
          <div class="info-row"><span class="info-label">Téléphone :</span><span class="info-value">${formData.telephone}</span></div>
          <div class="info-row"><span class="info-label">Email :</span><span class="info-value">${formData.email}</span></div>
        </div>

        <div class="section">
          <div class="section-title">🔧 Détails du projet</div>
          <div class="info-row"><span class="info-label">Type de Projet :</span><span class="info-value">${getProjetLabel(formData.projet)}</span></div>
          <div class="info-row"><span class="info-label">Type de toiture :</span><span class="info-value">${getToitureLabel(formData.typeToiture)}</span></div>
        </div>

        <div class="section">
          <div class="section-title">📝 Description du projet</div>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 12px; border-radius: 3px; border-left: 3px solid #0565C4;">
${formData.description}
          </p>
        </div>

        <p style="margin-top: 30px;">À bientôt,<br><strong>Système TF Couverture</strong></p>
      </div>

      <div class="footer">
        <p>Tf Couverture | Rénovation & Isolation de Toiture</p>
        <p>© ${new Date().getFullYear()} Tf Couverture. Tous droits réservés.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Fonction pour générer l'email de confirmation (pour le client)
function generateConfirmationEmailHTML(formData) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px; }
      .header { background-color: #0565C4; color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
      .content { background-color: white; padding: 30px; border-radius: 0 0 5px 5px; }
      .footer { background-color: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 5px; margin-top: 20px; }
      .success-message { background-color: #d4edda; border-left: 4px solid #28a745; padding: 12px; margin: 20px 0; border-radius: 3px; color: #155724; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>✓ Confirmation de votre demande</h1>
        <p>Tf Couverture</p>
      </div>

      <div class="content">
        <h2>Merci ${formData.prenom} !</h2>
        
        <div class="success-message">
          <strong>✓</strong> Nous avons bien reçu votre demande de devis.
        </div>

        <p>Un représentant de TF Couverture vous contactera très bientôt pour confirmer votre rendez-vous et discuter de votre projet.</p>

        <p style="margin-top: 30px;">En attendant, vous pouvez nous contacter directement :</p>
        <ul>
          <li><strong>Téléphone :</strong> 07 72 35 59 34</li>
          <li><strong>Email :</strong> contact@tfouverture.com</li>
          <li><strong>Adresse :</strong> 1-3 rue Maryse Bastié, 93600 Aulnay sous Bois</li>
        </ul>

        <p style="margin-top: 30px;">Cordialement,<br><strong>L'équipe Tf Couverture</strong></p>
      </div>

      <div class="footer">
        <p>Tf Couverture | Rénovation & Isolation de Toiture</p>
        <p>© ${new Date().getFullYear()} Tf Couverture. Tous droits réservés.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// Route pour envoyer l'email
app.post('/api/send-quote-request', async (req, res) => {
  try {
    const formData = req.body;

    // Validation basique
    if (!formData.email || !formData.nom) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email et nom sont requis' 
      });
    }

    const htmlContent = generateEmailHTML(formData);
    const confirmationHtmlContent = generateConfirmationEmailHTML(formData);

    // ✅ Email à l'entreprise (adresse professionnelle)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Email de l'entreprise depuis les variables d'env
      subject: `Nouvelle demande de devis - ${formData.nom} ${formData.prenom}`,
      html: htmlContent,
    });

    // ✅ Email de confirmation au client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formData.email, // Email du client
      subject: 'Confirmation de votre demande de devis - Tf Couverture',
      html: confirmationHtmlContent,
    });

    res.json({ 
      success: true, 
      message: 'Demande envoyée avec succès!' 
    });

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi de la demande',
      error: error.message 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});