let { cancelAppointment } = require("./features/cancelAppointment");
let { deleteUserDetails } = require("./features/deleteUserDetails");
let { loginUser } = require("./loginUser");
let { registerUser } = require("./registerUser");

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

