let { cancelAppointment } = require("./cancelAppointment");
let { deleteUserDetails } = require("./deleteUserDetails");

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

(async function login() {
    let response;
    try {
        response = await loginUser({ phone: "9999602530" });
        console.log(response);
    } catch(err) {
        response = err.message;
    } finally {
        return response;
    }
})(); 

