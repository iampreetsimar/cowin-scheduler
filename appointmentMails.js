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

function cancellationMail() {
    return new Promise(function(resolve, reject) {
        let transporter = createTransporter();
        let infoPromise = transporter.sendMail({
            from: '"Cowin Scheduler " <cowin.appointment.scheduler@gmail.com>', // sender address
            to: "simar94.singh@gmail.com", // list of receivers
            subject: "Cowin Scheduler - Covid Vaccination Appointment Cancelled", // Subject line
            text: "Your appoinment has been cancelled on the Cowin Portal" // plain text body
        });

        infoPromise
            .then(function(){
                resolve();
            }).catch(function() {
                reject();
            })
    });
}

module.exports = {
    confirmationMail: confirmationMail,
    cancellationMail: cancellationMail
}

