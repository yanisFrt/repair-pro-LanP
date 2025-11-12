import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface MailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Log des données reçues de l'utilisateur
    // console.log("Données reçues de l'utilisateur:", req.body);

    const { name, email, subject, message }: MailData = req.body;

    // Log des valeurs extraites
    // console.log(`Nom: ${name}, Email: ${email}, Sujet: ${subject}, Message: ${message}`);

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Adresse email de l'expéditeur
        pass: process.env.EMAIL_PASS, // Mot de passe de l'expéditeur
      },
    });

    // Log de la configuration du transporteur
    // console.log("Configuration du transporteur effectuée avec succès");

    try {
      // Options du mail
      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Adresse email où recevoir les messages
        subject: `Message de ${name}: ${subject}`,
        text: message,
        html: `<p>Nom: ${name}</p><p>Email: ${email}</p><p>Sujet: ${subject}</p><p>Message: ${message}</p>`,
      };

      // Log des options du mail
      console.log("Options du mail:", mailOptions);

      // Envoi de l'email
      await transporter.sendMail(mailOptions);

      // Log en cas de succès
      console.log("Email envoyé avec succès");

      res.status(200).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
      // Log en cas d'erreur
      console.error("Erreur lors de l'envoi de l'email:", error);
      res.status(500).json({ error: "Erreur lors de l'envoi du message." });
    }
  } else {
    // Log si la méthode n'est pas autorisée
    // console.warn("Méthode non autorisée:", req.method);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: "Méthode non autorisée" });
  }
}
