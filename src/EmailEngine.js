const nodemailer = require('nodemailer');

exports.sendMail = async (email, subject, message) => {
  const transport = nodemailer.createTransport({
    smtp: 'smtp.gmail.com',
    host: 'smtp.gmail.com',
    auth: {
      user: 'sarikalikhar2619@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transport.sendMail({
    email: 'sarikalikhar2619@gmail.com',
    to: email,
    subject: subject,
    html: message,
  });
  return true;
};
