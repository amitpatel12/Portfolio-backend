const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
const sendGridTransporter = require("nodemailer-sendgrid-transport");
const { application } = require("express");
require("dotenv").config();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// let options = {
//   // auth:{
//   //     api_key:process.env.API_SENDGRID
//   // },

//   auth: {
//     user: "patelamitkumar153@gmail.com",
//     pass: "Venom@251111",
//   },
// };

// const transporter = nodemailer.createTransport(sendGridTransporter(options));
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
  },
  auth: {
    user: "amitrecb@gmail.com",
    pass: "ifhcaihchcvydzha",
  },
});

app.post("/sendmail", (req, res) => {
  const { name, email, jobtypes, message } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Please add your name" });
  }

  if (!email) {
    return res.status(400).json({ error: "Please add your email" });
  }

  if (!jobtypes) {
    return res.status(400).json({ error: "Please add jobtypes" });
  }

  if (!message) {
    return res.status(400).json({ error: "Please add your message" });
  }

  let email_data = {
    from: "amitrecb@gmail.com",
    to: "patelamitkumar2511@gmail.com",
    subject: "Job Types - Message from Portfolio",
    text: "Hi there!",
    html: `
            <h4>Detail Information:</h4>

            <ul>
                <li><p>Name: ${name} </p></li>
                <li><p>E-mail: ${email} </p></li>
                <li><p>Job Types: ${jobtypes} </p></li>
                <li><p>Message: ${message} </p></li>
            </ul>
        `,
  };

  transporter.sendMail(email_data, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log("Email sent successfully", res);
  });

  res.status(200).json("your email send successfully");
});

app.listen(PORT, (req, res) => {
  console.log("server connected");
});
