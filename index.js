let { cancelAppointment } = require("./features/cancelAppointment");
let { deleteUserDetails } = require("./features/deleteUserDetails");
let { loginUser } = require("./features/loginUser");
let { registerUser } = require("./features/registerUser");
let { initiateWhatsappBot } = require("./features/whatsappBot");
let { launchPuppeteer } = require("./utils/common");




(async function startup() {
    try {
        let browserInstance = await launchPuppeteer();
        let tabs = await browserInstance.pages();
        let tab = tabs[0]; // current tab
    
        await initiateWhatsappBot(tab);

        // close browser instance
    } catch(err) {
        console.log(err.message);
    }
})();

async function cancellation() {
    let response;
    try {
        response = await cancelAppointment({ phone: "9999602530", email: "simar94.singh@gmail.com" });
        console.log(response);
    } catch(err) {
        response = err.message;
    } finally {
        return response;
    }
}; 

async function deleteUser() {
    let response;
    try {
        response = await deleteUserDetails({ phone: "9999602530", email: "simar94.singh@gmail.com" });
        console.log(response);
    } catch(err) {
        response = err.message;
    } finally {
        return response;
    }
}; 

async function login() {
    let response;
    try {
        await loginUser({ phone: "9999602530" });
    } catch(err) {
        response = err.message;
    } finally {
        return response;
    }
}; 

async function register() {
    let response;
    try {
        await registerUser({ 
            phone: "9999602530", 
            photoId: "AadhaarCard",
            photoIdNumber: "666666666666",
            name: "Simarpreet Singh",
            gender: "Male",
            birthYear: "1961",
            pinCode: "110008"
        });
    } catch(err) {
        response = err.message;
    } finally {
        return response;
    }
}; 

async function schedule() {
    
}

