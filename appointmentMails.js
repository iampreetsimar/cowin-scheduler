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

function confirmationMail(appointmentDetails) {
    return new Promise(function(resolve, reject) {
        let transporter = createTransporter();
        let infoPromise = transporter.sendMail({
            from: '"Cowin Scheduler " <cowin.appointment.scheduler@gmail.com>', // sender address
            to: "simar94.singh@gmail.com", // list of receivers
            subject: "Cowin Scheduler - Covid Vaccination Appointment Confirmation", // Subject line
            text: appointmentDetails // plain text body
        });

        infoPromise
            .then(function(){
                resolve();
            }).catch(function() {
                reject();
            })
    });
}

function cancellationMail(data) {
    return new Promise(function(resolve, reject) {
        let transporter = createTransporter();
        let mailOptions = getMailOptions(data);
        let infoPromise = transporter.sendMail(mailOptions);
        infoPromise
            .then(function(){
                resolve();
            }).catch(function() {
                reject();
            })
    });
}

function sendMail(data) {
    return new Promise(function(resolve, reject) {
        let transporter = createTransporter();
        let mailOptions = getMailOptions(data);
        let infoPromise = transporter.sendMail(mailOptions);
        infoPromise
            .then(function(){
                resolve();
            }).catch(function() {
                reject();
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
    confirmationMail: confirmationMail,
    cancellationMail: cancellationMail,
    sendMail: sendMail
}

