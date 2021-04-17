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
        let selectIDPromise = selectPhotoIDInDropdown("mat-select-value-1", 5000, "mat-option-0");
        return selectIDPromise;
    }).then(function() {
        console.log("...id chosen");
        let typeIdPromise = waitAndType("input[formcontrolname='photo_id_number']", "666666666666");
        return typeIdPromise;
    }).then(function() {
        console.log("...typing id number");
        let typeNamePromise = waitAndType("input[formcontrolname='name']", "Simarpreet Singh");
        return typeNamePromise;
    }).then(function() {
        console.log("...typing name");
        let selectRadioPromise = selectRadio("mat-radio-4-input");
        return selectRadioPromise;
    }).then(function() {
        console.log("...selected gender");
        let typeBirthYearPromise = waitAndType("input[formcontrolname='birth_year']", "1961");
        return typeBirthYearPromise;
    }).then(function() {
        console.log("...typing year");
        let registerPromise = waitAndClick(".covid-button-desktop.ion-text-end.button-container .register-btn");
        return registerPromise;
    }).then(function() {
        console.log("...user registered");
        let sleepPromise = sleep(7000);
        return sleepPromise;
    }).then(function() {
        let scheduleAppointment = waitAndClick(".btnlist.ng-star-inserted a");
        return scheduleAppointment;
    }).then(function() {
        console.log("...clicked on schedule appointment");
        let scheduleFinalPromise = waitAndClick(".covid-button-desktop.ion-text-end.book-btn");
        return scheduleFinalPromise;
    }).then(function() {
        console.log("...clicked on schedule appointment final");
        let searchByPincodePromise = waitAndType("input[formcontrolname='pincode']", "110008");
        return searchByPincodePromise;
    }).then(function() {
        console.log("...typing pincode");
        let searchButtonPromise = waitAndClick(".pin-search-btn.md.button.button-solid.ion-activatable.ion-focusable.hydrated");
        return searchButtonPromise;
    }).then(function() {
        console.log("...search button clicked");
        let selectCenterPromise = selectVaccinationCenter();
        return selectCenterPromise;
    }).then(function() {
        console.log("...selected vaccination center");
        let timeSlotPromise = selectTimeSlot();
        return timeSlotPromise;
    }).then(function() {
        console.log("...selected time slot");
        let confirmAppointmentPromise = waitAndClick(".covid-button-desktop.ion-text-end.book-btn.button-container__right .confirm-btn");
        return confirmAppointmentPromise;
    }).then(function() {
        console.log("...appointment confirmed");
        let appointmentDetails = getAppointmentDetails();
        return appointmentDetails;
    }).then(function(appointmentDetails) {
        console.log(appointmentDetails);
        console.log("...sending appointment details on mail");
    }).catch(function(err) {
        console.log(err);
    })

/*
    CUSTOM PROMISE FUNCTION
    INPUT - selector
    OUTPUT - waits for selector to appear on page and clicks on it
*/
function waitAndClick(selector, delayVal = 500) {
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
    CUSTOM PROMISE FUNCTION
    INPUT - selector
    OUTPUT - waits for selector to appear on page and types in it
*/
function waitAndType(selector, input) {
    return new Promise(function(resolve, reject) {
        let waitForClickSelectorPromise = waitAndClick(selector);
        waitForClickSelectorPromise
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

function sleep(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, time);
    })
}

function selectPhotoIDInDropdown(selector, delayVal, idSelector) {
    return new Promise(function(resolve, reject) {
        
        let sleepPromise = sleep(delayVal);
        sleepPromise
            .then(function() {
                let waitForDropdownPromise = waitAndClick("#" + selector);
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
            }).catch(function() {
                reject();
            });
    });
}

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
            });
    });
}

function selectVaccinationCenter() {
    return new Promise(function(resolve, reject) {
        sleep(3000)
            .then(function() {
                return tab.waitForSelector("div[class='mat-list-text']", { visible: true });
            }).then(function() {
                function browserSelectCenter(centerRowsSelector, availableSlotsSelector) {
                    let selectedSlot;
                    let centerListCount = document.querySelectorAll(centerRowsSelector);
                    if(centerListCount.length > 0) {
                        for(let i = 0; i < centerListCount.length; i++) {
                            let slotsForCurrentWeek = centerListCount[i].querySelectorAll(availableSlotsSelector);
                            if(slotsForCurrentWeek.length > 0) {
                                for(let j = 0; j < slotsForCurrentWeek.length; j++) {
                                    if(slotsForCurrentWeek[j].innerText) {
                                        selectedSlot = slotsForCurrentWeek[j];
                                        break;
                                    }
                                }
                            }

                            if(selectedSlot)
                                break;  
                        }
                    } 
                    
                    if(selectedSlot)
                        selectedSlot.click();
                    else {
                        throw new Error("No appointments available this week in your pincode");
                    }
                }

                let evaluatePromise = tab.evaluate(browserSelectCenter, "div[class='mat-list-text']", ".slots-box.ng-star-inserted a");
                return evaluatePromise;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            }) 
    })
}

function selectTimeSlot() {
    return new Promise(function(resolve, reject) {
        sleep(3000)
            .then(function() {
                return tab.waitForSelector(".time-slot-list .time-slot", { visible: true });
            }).then(function() {
                function browserPickTimeSlot(timeSlotListSelector) {
                    let timeSlotList = document.querySelectorAll(timeSlotListSelector);
                    if(timeSlotList.length > 0) {
                        timeSlotList[0].click();
                    } else {
                        throw new Error("No time slot available");
                    }
                }

                let evaluatePromise = tab.evaluate(browserPickTimeSlot, ".time-slot-list .time-slot");
                return evaluatePromise;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            });
    });
}

function getAppointmentDetails() {
    return new Promise(function(resolve, reject) {
        let detailsSelector = tab.waitForSelector("ion-grid[class='aadhar-otp-submit-form md hydrated']", { visible: true });
        detailsSelector
            .then(function() {
                function browserAppointmentDetails(selector) {
                    let allDetails = document.querySelectorAll(selector);
                    allDetails = allDetails[1];

                    detailRows = allDetails.querySelectorAll("ion-row[class='md hydrated']");
                    let confirmationMessage;
                    let center;
                    let date;
                    let time;
                    let preference;
                    let name;
                    let referenceId;
                    let photoIdToCarry;
                    let instructions;

                    for(let i = 0; i < detailRows.length; i++) {
                        if(i == 0) {
                            let confirmationMessageElements = detailRows[i].getElementsByTagName("p");
                            confirmationMessageElements.forEach(function(elem) {
                                confirmationMessage += elem.innerText + "\n";
                            })

                            let individualDetailsList = detailRows[i].querySelectorAll("ion-col.md.hydrated']");
                            for(let j = 0; j < individualDetailsList.length; j++) {
                                switch(j) {
                                    case 2:
                                        center = individualDetailsList[j].innerText;
                                        break;
                                    case 3:
                                        date = individualDetailsList[j].innerText;
                                        break;
                                    case 4:
                                        time = individualDetailsList[j].innerText;
                                        break;
                                    case 5:
                                        preference = individualDetailsList[j].innerText;
                                        break;
                                    case 6:
                                        let tableDetails = individualDetailsList[j].querySelectorAll(".divTableCell");
                                        for(let k = 0; k < tableDetails.length; k++) {
                                            if(k == 1)
                                                name = tableDetails[k].innerText;

                                            if(k == 2)
                                                referenceId = tableDetails[k].innerText;

                                            if(k == 3)
                                                photoIdToCarry = tableDetails[k].innerText;
                                        }
                                        break; 
                                }
                            } 

                        } else if(i == 2) {
                            instructions = detailRows[i].innerText;
                        }
                    }

                    let appointmentDetailsObject = {
                        confirmationMessage: confirmationMessage,
                        center: center,
                        date: date,
                        time: time,
                        preference: preference,
                        name: name,
                        photoIdToCarry: photoIdToCarry,
                        referenceId: referenceId,
                        instructions: instructions
                    }

                    console.log(appointmentDetailsObject);
                    return appointmentDetailsObject;
                };

                let appointmentDetails = tab.evaluate(browserAppointmentDetails, "ion-grid[class='aadhar-otp-submit-form md hydrated']");
                return appointmentDetails;
            }).then(function(detailsObject) {
                resolve(detailsObject);
            }).catch(function() {
                reject();
            });
    });
}

console.log("After");


/*
    DROPDOWN
    mat-option[id='mat-option-0'] - Aadhaar Card
    mat-option[id='mat-option-1'] - DL
    mat-option[id='mat-option-2'] - PAN Card
    mat-option[id='mat-option-3'] - Passport
    mat-option[id='mat-option-4'] - Pension Passbook
    mat-option[id='mat-option-5'] - NPR Smart Card
    mat-option[id='mat-option-6'] - Voter ID

    RADIO
    mat-radio-2-input - Male
    mat-radio-3-input - Female
    mat-radio-4-input - Others

    mat-selection-list[formcontrolname="center_id"] 
    document.querySelectorAll("div[class='mat-list-text']") if visible

    Centers
    document.querySelectorAll(".slots-box.ng-star-inserted a") if innerText != ""


*/
