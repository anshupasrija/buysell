const nodemailer = require('nodemailer');
const smtpServerURL = process.env.SMTP;
const authUser = process.env.EMAIL_ACCOUNT;
const authPass = process.env.EMAIL_PASSWORD;
const fromEmail = process.env.EMAIL_SENDER;

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AT;
const serviceSid = process.env.TWILIO_SSSID;
const client = require('twilio')(accountSid, authToken);


const sendMessages = (req, res) => {

  const tradeId = req.body.trade_id;
  const userEmail = req.body.user_email;
  const userPhone = req.body.user_phone;
  const emailTitle = `Auto World / Trade:${tradeId}`;
  const emailMessage = `Contact Name : ${req.body.user_name}\nContact email : ${req.body.user_email}\nContact phone : ${req.body.user_phone}\n\n${req.body.user_message}`;


  if(userPhone){
    sendSMS(userPhone, '\n'+emailTitle+'\n'+emailMessage);
  }

  sendEmail(res, userEmail, emailTitle, emailMessage);
};

const sendSMS = (phone, text) => client.messages
      .create({
        body: text,
        messagingServiceSid: serviceSid,
        to: phone
       })
      .then(message => console.log(message.sid))
      .done();

const sendEmail = (res, toEmail, title, txt) => {
    let transporter = nodemailer.createTransport({
        host: smtpServerURL,    //SMTP
        secure: true,           //Security option
        auth: {
            user: authUser,     //Account
            pass: authPass      //Password
        }
    });

    let mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: title,
        text: txt
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(500).send('false');
      } else {
        console.log("Finish sending email : " + info.response);
        res.status(200).send('OK');
      }
      transporter.close();
  })
};

module.exports = sendMessages;


