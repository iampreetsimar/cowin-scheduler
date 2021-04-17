let nodemailer = require("nodemailer");

function createTransporter() {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "cowin.appointment.scheduler@gmail.com", 
          pass: "cowinScheduler_2021", 
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
                console.log("confirmation mail sent");
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
                console.log("cancellation mail sent");
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

