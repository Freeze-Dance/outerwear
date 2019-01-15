const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'freezeDance2019@gmail.com',
    pass: 'freeze-admin'
  }
})

const mailOptions = {
  from: 'freezeDance2019@gmail.com',
  to: 'freezeDance2019@gmail.com',
  subject: 'Item Delivered',
  text: 'Your item is successfully delivered.'
}

const sendEmail = transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})

module.exports = {sendEmail, transporter}
