const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '<sender_email>',
        pass: '<sender_password>'
    }
});

const sendEmail = async (to, title, message) => {
    var mailOptions = {
        from: '<sender_email>',
        to: to,
        subject: title,
        text: message
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
module.exports = sendEmail 
