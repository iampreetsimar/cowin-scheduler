let { sendMail } = require("./appointmentMails");
let { logoutUser, waitAndClick, waitAndType, sleep } = require("../utils/common");
let { confirmationMailSubject } = require("../utils/constants");

function scheduleAppointment(data, tab) {
    return new Promise(function(resolve, reject) {
        let scheduleAppointmentPromise = waitAndClick(tab, ".btnlist.ng-star-inserted a");
        scheduleAppointmentPromise
            .then(function() {
                console.log("...clicked on schedule appointment");
                let scheduleFinalPromise = waitAndClick(tab, ".covid-button-desktop.ion-text-end.book-btn");
                return scheduleFinalPromise;
            }).then(function() {
                console.log("...clicked on schedule appointment final");
                let searchByPincodePromise = waitAndType(tab, "input[formcontrolname='pincode']", data.pinCode);
                return searchByPincodePromise;
            }).then(function() {
                console.log("...typing pincode");
                let searchButtonPromise = waitAndClick(tab, ".pin-search-btn.md.button.button-solid.ion-activatable.ion-focusable.hydrated");
                return searchButtonPromise;
            }).then(function() {
                console.log("...search button clicked");
                let selectCenterPromise = selectVaccinationCenter(tab);
                return selectCenterPromise;
            }).then(function() {
                console.log("...selected vaccination center");
                let timeSlotPromise = selectTimeSlot(tab);
                return timeSlotPromise;
            }).then(function() {
                console.log("...selected time slot");
                let confirmAppointmentPromise = waitAndClick(tab, ".covid-button-desktop.ion-text-end.book-btn.button-container__right .confirm-btn");
                return confirmAppointmentPromise;
            }).then(function() {
                console.log("...appointment confirmed");
                let appointmentDetails = getAppointmentDetails(tab);
                return appointmentDetails;
            }).then(function(appointmentDetails) {
                console.log("...sending appointment details on mail");
                let sendAppointmentConfirmationMail = sendConfirmationMail(appointmentDetails.details, data);
                return sendAppointmentConfirmationMail;
            }).then(function() {
                console.log("...confirmation mail sent");
                let logoutPromise = logoutUser(tab);
                return logoutPromise;
            }).then(function() {
                resolve(confirmationMailSubject);
            }).catch(function(err) {
                reject(err);
            });
    });
}
 
function selectVaccinationCenter(tab) {
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

function selectTimeSlot(tab) {
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

function getAppointmentDetails(tab) {
    return new Promise(function(resolve, reject) {
        sleep(2000)
            .then(function() {
                function browserAppointmentDetails(selector) {
                    let detailsSel = document.querySelectorAll(selector);
                    if(detailsSel.length <= 1) {
                        return;
                    }

                    let details = detailsSel[1];
                    let detailsObject = {
                        details: details.innerText
                    }
                    
                    return detailsObject;
                }

                let appointmentDetails = tab.evaluate(browserAppointmentDetails, "ion-grid[class='aadhar-otp-submit-form md hydrated']");
                return appointmentDetails;
            }).then(function(details) {
                resolve(details);
            }).catch(function() {
                reject();
            });
    });
}

function sendConfirmationMail(appointmentDetails, receiverData) {
    return new Promise(function(resolve, reject) {
        if(!appointmentDetails)
            reject();

        appointmentDetails = createMailBody(appointmentDetails);
        let appointmentConfirmationMail = sendMail({ 
            email: receiverData.email, 
            subject: confirmationMailSubject,
            mailBody: appointmentDetails 
        });
        appointmentConfirmationMail
            .then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    })
}

function createMailBody(appointmentDetails) {
    let detailsArr = appointmentDetails.split("\n");
    detailsArr.shift();
    detailsArr.pop();
    appointmentDetails = detailsArr.join("\n");
    return appointmentDetails;
}

module.exports = {
    scheduleAppointment: scheduleAppointment
}

