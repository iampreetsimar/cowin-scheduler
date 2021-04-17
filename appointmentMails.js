let nodemailer = require("nodemailer");
let { mailerCredentials } = require("./utils/credentials");

function createTransporter() {
    let transporter = nodemailer.createTransport({
        service: mailerCredentials.service,
        auth: {
          user: mailerCredentials.email, 
          pass: mailerCredentials.password, 
        },
    });

    return transporter;
}

function sendMail(data) {
    return new Promise(function(resolve, reject) {
        let transporter = createTransporter();
        let mailOptions = getMailOptions(data);
        let infoPromise = transporter.sendMail(mailOptions);
        infoPromise
            .then(function(){
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    });
}

function getMailOptions(data) {
    return {
        from: '"' + mailerCredentials.name + '" <' + mailerCredentials.email + '>', // sender address
        to: data.email, // receiver address
        subject: data.subject, // Subject line
        text: data.mailBody // plain text body
    };
}

module.exports = {
    sendMail: sendMail
}

