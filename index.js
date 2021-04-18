let { launchPuppeteer, readUserDetailsFromJson } = require("./utils/common");
let { loginUser } = require("./features/loginUser");
let { registerUser } = require("./features/registerUser");
let { scheduleAppointment } = require("./features/scheduleAppointment");
let { cancelAppointment } = require("./features/cancelAppointment");
let { deleteUserDetails } = require("./features/deleteUserDetails");
let { jsonFilePath } = require("./utils/constants");
// let { initiateWhatsappBot } = require("./features/whatsappBot");

// FEATURE TO BE ADDED IN NEXT ITERATION
// (async function startup() {
//     try {
//         let browserInstance = await launchPuppeteer();
//         let tabs = await browserInstance.pages();
//         let tab = tabs[0]; // current tab
    
//         await initiateWhatsappBot(tab, browserInstance);

//         // close browser instance
//     } catch(err) {
//         console.log(err.message);
//     }
// })();

async function bookAppointment(userDetails) {
    try {
        let browserInstance = await launchPuppeteer();
        let tabs = await browserInstance.pages();
        let tab = tabs[0]; // current tab

        await loginUser(userDetails, tab);
        await registerUser(userDetails, tab);
        let response = await scheduleAppointment(userDetails, tab);
        console.log(response);

        // close browser instance
        browserInstance.close();
    } catch(err) {
        console.log(err.message);
    }
};

async function cancelAppointmentFromPortal(userDetails) {
    try {
        let browserInstance = await launchPuppeteer();
        let tabs = await browserInstance.pages();
        let tab = tabs[0]; // current tab

        await loginUser(userDetails, tab);
        let response = await cancelAppointment(userDetails, tab)
        console.log(response);

        // close browser instance
        browserInstance.close();
    } catch(err) {
        console.log(err.message);
    }
}

async function deleteUserDetailsFromPortal(userDetails) {
    try {
        let browserInstance = await launchPuppeteer();
        let tabs = await browserInstance.pages();
        let tab = tabs[0]; // current tab

        await loginUser(userDetails, tab);
        let response = await deleteUserDetails(userDetails, tab)
        console.log(response);

        // close browser instance
        browserInstance.close();
    } catch(err) {
        console.log(err.message);
    }
}

(function startup() {
    try {

        /*
            JSON File is of following format - 
                {
                    "userDetails": {
                        "phone": "xxxxxxxxxx", 
                        "photoId": "AadhaarCard/DrivingLicense/PANCard/Passport/PensionPassbook/NPRSmartCard/VoterIDCard",   -- choose any one in the same format
                        "photoIdNumber": "xxxxxxxxxxxx",  -- proper ID number, no validation added yet in automation -> will give error if wrong
                        "name": "your name",
                        "gender": "Male/Female/Others",
                        "birthYear": "YYYY", -- user must be greater than 45 years old in order to schedule appointment on cowin portal as of now
                        "pinCode": "xxxxxx",
                        "email": "your email address"
                    }
                }
        */

        let userDetails = readUserDetailsFromJson(jsonFilePath);
        bookAppointment(userDetails);
        // cancelAppointmentFromPortal(userDetails);
        // deleteUserDetailsFromPortal(userDetails);
    } catch(err) {
        console.log(err);
    }
})();









