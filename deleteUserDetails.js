let puppeteer = require("puppeteer");
let cowinPortalLoginPageUrl = "https://selfregistration.cowin.gov.in/";
let { waitAndClick, typeOTP, logoutUser, sleep } = require("./utils/common");
let { sendMail } = require("./appointmentMails");
let { deleteUserDetailsMailBody, deleteUserDetailsMailSubject } = require("./utils/constants");
let instance;
let tab;

function deleteUserDetails(data) {
    return new Promise(function(resolve, reject) {
        let browserInstancePromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        }) ;
        
        browserInstancePromise
            .then(function(browserInstance) {
                instance = browserInstance;
                return browserInstance.pages();
            }).then(function(tabs) {
                tab = tabs[0];
                let portalPagePromise = tab.goto(cowinPortalLoginPageUrl);
                console.log("...opening register/signin user page");
                return portalPagePromise;
            }).then(function() {
                let inputPhonePromise = waitAndClick(tab, "#mat-input-0");
                return inputPhonePromise;
            }).then(function() {
                console.log("...typing phone");
                let typeNumberPromise = tab.type("#mat-input-0", data.phone, { delay: 200 });
                return typeNumberPromise;
            }).then(function() {
                console.log("...click on get OTP");
                let getOTPPromise = waitAndClick(tab, ".covid-button-desktop.ion-text-center");
                return getOTPPromise;
            }).then(function() {
                console.log("...waiting for OTP");
                let otpPromise = waitAndClick(tab, "#mat-input-1");
                return otpPromise;
            }).then(function() {
                console.log("...typing OTP");
                let typeOTPPromise = typeOTP(tab);
                return typeOTPPromise;
            }).then(function() {
                console.log("...click on verify OTP");
                let verifyOTPPromise = waitAndClick(tab, "ion-button[class='next-btn vac-btn md button button-solid ion-activatable ion-focusable hydrated']");
                return verifyOTPPromise;
            }).then(function() {
                return sleep(5000);
            }).then(function() {
                console.log("...user logged in");
                let deletionPromise = waitAndClick(tab, "ion-icon[tooltip='Delete Individual']", 2000);
                return deletionPromise;
            }).then(function() {
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