let puppeteer = require("puppeteer");
let fs = require("fs");
let path = require("path");

/*
    INPUT - tab
    OUTPUT - logs out user from the portal
*/
function logoutUser(tab) {
    return new Promise(function(resolve, reject) {
        let clickPromise = waitAndClick(tab, ".navigation .ng-star-inserted");
        clickPromise
            .then(function() {
                console.log("...user logged out");
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    });
}

/*
    INPUT - tab, selector, delayVal - delays the click in ms
    OUTPUT - waits for selector to appear on page and clicks on it
*/
function waitAndClick(tab, selector, delayVal = 500) {
    return new Promise(function(resolve, reject) {
        let waitForSelectorPromise = tab.waitForSelector(selector, { visible: true });
        waitForSelectorPromise
            .then(function() {
                let waitForClickPromise = tab.click(selector, { delay: delayVal });
                return waitForClickPromise;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    });
}

/*
    INPUT - tab
    OUTPUT - waits for the user to type OTP manually in puppeteer window
*/
function typeOTP(tab) {
    return new Promise(function(resolve, reject) {
        function waitForOTP() {
            const otpInput = document.getElementById("mat-input-1");
            return otpInput &&
            otpInput.value.length == 6;
        }

        let OTPpromise = tab.waitForFunction(waitForOTP, { timeout: 180000 });
        OTPpromise
            .then(function() {
                console.log("...OTP filled");
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    });
}

/*
    INPUT - time in milliseconds
    OUTPUT - control stops/pauses for the time specified
*/
function sleep(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, time);
    })
}

/*
    INPUT - tab, selector, input to type
    OUTPUT - waits for selector to appear on page and types in it
*/
function waitAndType(tab, selector, input, delayVal = 100) {
    return new Promise(function(resolve, reject) {
        let waitForClickSelectorPromise = waitAndClick(tab, selector);
        waitForClickSelectorPromise
            .then(function() {
                let typeInputPromise = tab.type(selector, input, { delay: delayVal });
                return typeInputPromise;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    });
}

/*
    OUTPUT - starts chromium window using puppeteer and returns browser instance
*/
function launchPuppeteer() {
    return new Promise(function(resolve, reject) {
        let launchPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });

        launchPromise
            .then(function(launchPromise) {
                resolve(launchPromise);
            }).catch(function(err) {
                reject(err);
            });
    });
}

/*
    INPUT - jsonFilePath
    OUTPUT - reads json file and returns the userDetails object
*/
function readUserDetailsFromJson(jsonFilePath) {
    let userDetails = JSON.parse(fs.readFileSync(jsonFilePath)).userDetails;
    return userDetails;
}

module.exports = {
    logoutUser: logoutUser,
    typeOTP: typeOTP,
    waitAndClick: waitAndClick,
    waitAndType: waitAndType,
    sleep: sleep,
    launchPuppeteer: launchPuppeteer,
    readUserDetailsFromJson: readUserDetailsFromJson
};