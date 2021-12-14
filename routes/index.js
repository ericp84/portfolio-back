var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


  router.post('/contact', async function(req, res, next) {
    const successmsg = ''
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "epdevelopment.contact@gmail.com",
        pass: "Ericcv@16",
      },
    });
    let info = await transporter.sendMail({
      from: req.body.email,
      to: "epdevelopment.contact@gmail.com",
      subject: req.body.subject,
      text: req.body.message,
      phone: req.body.phone,
      html: `j'ai un nouveau message pour moi: ${req.body.email}<br/>${req.body.phone}<br/>${req.body.subject} <br/>${req.body.message}`,
    });
    console.log("message sent: %$", info.messageId);
    console.log("message sent: %$", req.body.message);
    console.log("preview URL: %$", nodemailer.getTestMessageUrl(info));
    if(res.status === 200) {
       successmsg = "votre messa à bien été envoyé à très bientôt"
    }
    console.log(res.status)
    res.status(200).redirect('/email')
  })

  router.get('/email', function(req, res, next) {
    
    res.status(200).render('email');

  })

module.exports = router;
