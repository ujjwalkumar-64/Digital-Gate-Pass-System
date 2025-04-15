import nodemailer from 'nodemailer';

// Setup the transporter using your SMTP service
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider here
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
      console.log('Email sent: ' + info.response);
      return { status: 'sent', info };
    })
    .catch(error => {
      console.log('Error in sending email:', error);
      return { status: 'failed', error };
    });
};

export  { sendEmail };

