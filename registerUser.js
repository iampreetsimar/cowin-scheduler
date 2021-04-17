let puppeteer = require("puppeteer");
let cowinPortalLoginPageUrl = "https://selfregistration.cowin.gov.in/";
let { waitAndClick, typeOTP, sleep, waitAndType } = require("./utils/common");
let { mappedPhotoIdSelector, mappedGenderRadioSelector } = require("./utils/constants");
let instance;
let tab;

function registerUser(data) {
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
                let selectIDPromise = selectPhotoIDInDropdown("mat-select-value-1", 5000, mappedPhotoIdSelector[data.photoId]);
                return selectIDPromise;
            }).then(function() {
                console.log("...id chosen");
                let typeIdPromise = waitAndType(tab, "input[formcontrolname='photo_id_number']", data.photoIdNumber);
                return typeIdPromise;
            }).then(function() {
                console.log("...typing id number");
                let typeNamePromise = waitAndType(tab, "input[formcontrolname='name']", data.name);
                return typeNamePromise;
            }).then(function() {
                console.log("...typing name");
                let selectRadioPromise = selectRadio(mappedGenderRadioSelector[data.gender]);
                return selectRadioPromise;
            }).then(function() {
                console.log("...selected gender");
                let typeBirthYearPromise = waitAndType(tab, "input[formcontrolname='birth_year']", data.birthYear);
                return typeBirthYearPromise;
            }).then(function() {
                console.log("...typing year");
                let registerPromise = waitAndClick(tab, ".covid-button-desktop.ion-text-end.button-container .register-btn");
                return registerPromise;
            }).then(function() {
                console.log("...user registered");
                let sleepPromise = sleep(7000);
                return sleepPromise;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            });
    });
}

/*
    INPUT - dropdownSelector, delayVal - click after the delay in ms, idSelector - dropdown option to select
    OUTPUT - select the specified dropdown option
*/
function selectPhotoIDInDropdown(selector, delayVal, idSelector) {
    return new Promise(function(resolve, reject) {
        
        let sleepPromise = sleep(delayVal);
        sleepPromise
            .then(function() {
                let waitForDropdownPromise = waitAndClick(tab, "#" + selector);
                return waitForDropdownPromise;
            }).then(function() {
                function browserFunction(idSelector) {
                    let optionId = document.getElementById(idSelector);
                    optionId.click();
                }

                let evaluatePromise = tab.evaluate(browserFunction, idSelector);
                return evaluatePromise;      
            }).then(function() {
                console.log("...selected ID");
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            });
    });
}

/*
    INPUT - selector - radio selector of the choice
    OUTPUT - selects the specified radio option
*/
function selectRadio(selector) {
    return new Promise(function(resolve, reject) {
        function selectRadioChoice(selector) {
            let radioChoice = document.getElementById(selector);
            radioChoice.click();
        }
          
        let evaluatePromise = tab.evaluate(selectRadioChoice, selector);
        evaluatePromise
            .then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            });
    });
}

module.exports = {
    registerUser: registerUser
};


