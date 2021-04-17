let puppeteer = require("puppeteer");
let cowinPortalLoginPageUrl = "https://selfregistration.cowin.gov.in/";
let { waitAndClick, typeOTP, sleep } = require("../utils/common");
let instance;
let tab;

function loginUser(data) {
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
                resolve();
            }).catch(function(err) {
                reject(err);
            });
    });
}

module.exports = {
    loginUser: loginUser
};