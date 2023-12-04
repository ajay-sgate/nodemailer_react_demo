const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors())

app.use(express.json());



const port = 8080;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.mail,
    pass: process.env.password
  },
});

app.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body;
  // console.log(req.body);
  const mailOptions = {
    from: process.env.mail,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info.response);
    res.send('Email sent successfully!');
  } catch (error) {
    // console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
