let { waitAndClick, logoutUser } = require("../utils/common");
let { sendMail } = require("./appointmentMails");
let { cancellationMailBody, cancellationMailSubject } = require("../utils/constants");

function cancelAppointment(data, tab) {
    return new Promise(function(resolve, reject) {
        let cancelPromise = waitAndClick(tab, "ion-icon[tooltip='Cancel Appointment']", 2000);
        cancelPromise
            .then(function() {
                console.log("...confirmation pop up opens");
                let confirmCancellation = waitAndClick(tab, "button[class='swal2-confirm swal2-styled']", 2000);
                return confirmCancellation;
            }).then(function() {
                console.log("...appointment cancelled");
                return tab.waitForSelector("ion-icon[tooltip='Delete Individual']", { visible: true });
            }).then(function() {
                console.log("...sending cancellation confirmation on mail");
                let sendCancellationConfirmationMail = sendMail({ 
                    email: data.email, 
                    subject: cancellationMailSubject,
                    mailBody: cancellationMailBody 
                });
                return sendCancellationConfirmationMail;
            }).then(function() {
                console.log("...cancellation mail sent");
                let logoutPromise = logoutUser(tab);
                return logoutPromise;
            }).then(function() {
                resolve(cancellationMailBody);
            }).catch(function(err) {
                reject(err);
            });
    });
}

module.exports = {
    cancelAppointment: cancelAppointment
};