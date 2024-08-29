import nodemailer from 'nodemailer';
require('dotenv').config();

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP
  }
});

/**
 * Sends an email using the configured nodemailer transporter.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} text - The plain text body of the email.
 * @param {string} html - The HTML body of the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // The sender's email address
      to: to,                       // The recipient's email address
      subject: subject,             // The subject of the email
      text: text,                   // The plain text content of the email
      html: html                    // The HTML content of the email
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', result);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};
