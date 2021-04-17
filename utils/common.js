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
            }).catch(function() {
                reject();
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
            }).catch(function() {
                reject();
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
            }).catch(function() {
                reject();
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

module.exports = {
    logoutUser: logoutUser,
    typeOTP: typeOTP,
    waitAndClick: waitAndClick,
    sleep: sleep
};