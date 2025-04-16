import nodemailer from 'nodemailer';
import logger from '../utils/logger.js'; // Import the logger utility

// Setup the transporter using your SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, // Your email (Gmail in this case)
    pass: process.env.EMAIL_PASS  // App password or normal password
  }
});

// Function to send email
const sendEmail = async (recipientEmail, subject, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: subject,
    text: message,
    html: `<p>${message}</p>`   
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
      logger.info(`✅ Email sent to ${recipientEmail}: ${info.response}`); // Log successful email sending
      return { status: 'sent', info };
    })
    .catch(error => {
      logger.error(`❌ Error in sending email to ${recipientEmail}:`, error); // Log email sending failure
      return { status: 'failed', error };
    });
};

export { sendEmail };

