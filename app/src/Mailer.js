var sender = 'lgpbeyondsight@gmail.com'; //(Change the @ symbol to %40 or do a url encoding )
var password = 'lgp-4b-BS';




const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing


exports.sendContactForm = function (email, infoName, infoEmail, infoComment) {
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: sender, // generated ethereal user
            pass: password // generated ethereal password
        },
        tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: email, // sender address
        to: infoEmail, // list of receivers
        subject: 'New contact form message ✔', // Subject line
        text: infoComment, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
};