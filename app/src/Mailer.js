var sender = 'smtps://lgpbeyondsight@gmail.com'; //(Change the @ symbol to %40 or do a url encoding )
var password = 'lgp-4b-BS';

var nodeMailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;

var transporter = nodeMailer.createTransport(sender + ':' + password + '@smtp.gmail.com');

// assumes text.{ext} and html.{ext} in template/directory
var sendEmail = transporter.templateSender(
    new EmailTemplate('./templates/emailTemplate'), {
        from: 'lgpbeyondsight@gmail.com',
    });

exports.sendContactForm = function (email, infoName, infoEmail, infoComment) {
    //transporter.template
    sendEmail({
        to: email,
        subject: 'Password Reset - YourDomain.com'
    }, {
        infoName: infoName,
        infoEmail: infoEmail,
        infoComment: infoComment
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n' + JSON.stringify(info));
        }
    });
};

