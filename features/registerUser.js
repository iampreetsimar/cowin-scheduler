let { waitAndClick, sleep, waitAndType } = require("../utils/common");
let { mappedPhotoIdSelector, mappedGenderRadioSelector } = require("../utils/constants");

function registerUser(data, tab) {
    return new Promise(function(resolve, reject) {
        let selectIDPromise = selectPhotoIDInDropdown(tab, "mat-select-value-1", 5000, mappedPhotoIdSelector[data.photoId]);
        selectIDPromise       
            .then(function() {
                console.log("...id chosen");
                let typeIdPromise = waitAndType(tab, "input[formcontrolname='photo_id_number']", data.photoIdNumber);
                return typeIdPromise;
            }).then(function() {
                console.log("...typing id number");
                let typeNamePromise = waitAndType(tab, "input[formcontrolname='name']", data.name);
                return typeNamePromise;
            }).then(function() {
                console.log("...typing name");
                let selectRadioPromise = selectRadio(tab, mappedGenderRadioSelector[data.gender]);
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
function selectPhotoIDInDropdown(tab, selector, delayVal, idSelector) {
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
function selectRadio(tab, selector) {
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


