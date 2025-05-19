const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or your email service
  auth: {
    user: "official.ajay2681993@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (data) => {
  const mailOptions = {
    from: "official.ajay2681993@gmail.com",
    to: data.to,
    subject: data.subject,
    text: "This is sample Email.",
    html: data.body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return "Error in sending email";
    } else {
      return info.response;
    }
  });
};

module.exports = sendMail;
