let { waitAndClick, logoutUser, sleep } = require("../utils/common");
let { sendMail } = require("./appointmentMails");
let { deleteUserDetailsMailBody, deleteUserDetailsMailSubject } = require("../utils/constants");

function deleteUserDetails(data, tab) {
    return new Promise(function(resolve, reject) {
        let deletionPromise = waitAndClick(tab, "ion-icon[tooltip='Delete Individual']", 2000);
        deletionPromise
            .then(function() {
                console.log("...confirmation pop up opens");
                let confirmDeletion = waitAndClick(tab, "button[class='swal2-confirm swal2-styled']", 2000);
                return confirmDeletion;
            }).then(function() {
                console.log("...user details deleted");
                return sleep(3000);
            }).then(function() {
                console.log("...sending user details deletion confirmation on mail");
                let sendUserDeletedConfirmationMail = sendMail({ 
                    email: data.email, 
                    subject: deleteUserDetailsMailSubject,
                    mailBody: deleteUserDetailsMailBody 
                });
                return sendUserDeletedConfirmationMail;
            }).then(function() {
                console.log("...user details deleted mail sent");
                let logoutPromise = logoutUser(tab);
                return logoutPromise;
            }).then(function() {
                resolve(deleteUserDetailsMailBody);
            }).catch(function(err) {
                reject(err);
            });
    });
}

module.exports = {
    deleteUserDetails: deleteUserDetails
};