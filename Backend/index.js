const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 8080;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.mail,
    pass: process.env.password
  },
});

app.get('/send-email', async (req, res) => {
  const { email } = req.body;
  const mailOptions = {
    from: process.env.mail,
    to: email,
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer via Node.js server!',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
