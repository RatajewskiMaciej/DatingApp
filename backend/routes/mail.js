const mailer = require("nodemailer");



const sendEmail = (email, id) => {

  const smtpTransport = mailer.createTransport({
    service: 'gmail',
    auth: {
      user: "aplikacjarandkowa@gmail.com",
      pass: "Aplikacjarandkowa@0"
    }
  })

  const mailOptions = {
    from: "aplikacjarandkowa@gmail.com",
    to: "aplikacjarandkowa@gmail.com",
    subject: `wiadomosc od ${id}`,
    text: email
  }

  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log(" email sent successfully")
    }
  })

}

module.exports = { sendEmail }