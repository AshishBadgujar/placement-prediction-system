const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'badgujarash12@gmail.com',
        pass: 'zuggsarqcfvafbva'
    }
});

const sendEmail = async (to, title, message) => {
    var mailOptions = {
        from: 'badgujarash12@gmail.com',
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