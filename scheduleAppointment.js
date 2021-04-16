let puppeteer = require("puppeteer");
let cowinPortalHomePageUrl = "https://www.cowin.gov.in/home";
let cowinPortalLoginPageUrl = "https://selfregistration.cowin.gov.in/";
let instance;
let tab;

console.log("Before");

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
        let inputPhonePromise = waitAndClick("#mat-input-0");
        return inputPhonePromise;
    }).then(function() {
        console.log("...typing phone");
        let typeNumberPromise = tab.type("#mat-input-0", "9999602530", { delay: 200 });
        return typeNumberPromise;
    }).then(function() {
        console.log("...click on get OTP");
        let getOTPPromise = waitAndClick(".covid-button-desktop.ion-text-center");
        return getOTPPromise;
    }).then(function() {
        console.log("...waiting for OTP");
        let otpPromise = waitAndClick("#mat-input-1");
        return otpPromise;
    }).then(function() {
        console.log("...typing OTP");
        let typeOTPPromise = typeOTP();
        return typeOTPPromise;
    }).then(function() {
        console.log("...click on verify OTP");
        let verifyOTPPromise = waitAndClick("ion-button[class='next-btn vac-btn md button button-solid ion-activatable ion-focusable hydrated']");
        return verifyOTPPromise;
    }).then(function() {
        console.log("...user logged in");
        let selectIDPromise = waitAndClick("#mat-select-0");
        return selectIDPromise;
    }).then(function() {
        console.log("...choose an id card");
        let chooseIdPromise = tab.click("ion-item[class='mat-main-field item md ion-focusable hydrated']");
        return chooseIdPromise;
        // , "mat-option-1")
    }).catch(function(err) {
        console.log(err);
    })

/*
    CUSTOM PROMISE FUNCTION
    INPUT - selector
    OUTPUT - waits for selector to appear on page and clicks on it
*/
function waitAndClick(selector) {
    return new Promise(function(resolve, reject) {
        let waitForSelectorPromise = tab.waitForSelector(selector, { visible: true });
        waitForSelectorPromise
            .then(function() {
                let waitForClickPromise = tab.click(selector, { delay: 500 });
                return waitForClickPromise;
            }).then(function() {
                resolve();
            }).catch(function() {
                reject();
            })
    });
}

/*
    CUSTOM PROMISE FUNCTION
    INPUT - selector
    OUTPUT - waits for selector to appear on page and types in it
*/
function waitAndType(selector, input) {
    return new Promise(function(resolve, reject) {
        let waitForSelectorPromise = tab.waitForSelector(selector, { visible: true });
        waitForSelectorPromise
            .then(function() {
                let typeInputPromise = tab.type(selector, input, { delay: 200 });
                return typeInputPromise;
            }).then(function() {
                resolve();
            }).catch(function() {
                reject();
            })
    });
}

function typeOTP() {
    return new Promise(function(resolve, reject) {
        function waitForOTP() {
            const otpInput = document.getElementById("mat-input-1");
            return otpInput &&
            otpInput.value.length == 6;
        }

        let OTPpromise = tab.waitForFunction(waitForOTP, { timeout: 180000 });
        OTPpromise
            .then(function() {
                console.log("OTP filled");
                resolve();
            })
    });
}

function selectID(selector, idName) {
    return new Promise(function(resolve, reject) {
        function browserFunction(selector, idSelector) {
            let idDropdown = document.querySelectorAll(selector);
            idDropdown[0].click();

            document.querySelector(idSelector).click();
        }

        let evaluatePromise = tab.evaluate(browserFunction, selector, idSelector);
        evaluatePromise
            .then(function() {
                console.log("...selected ID");
            }).then(function() {
                resolve();
            })
    });
}

console.log("After");