let { cancelAppointment } = require("./cancelAppointment");

(async function cancellation() {
    let response;
    try {
        response = await cancelAppointment({ phone: "9999602530", email: "simar94.singh@gmail.com" });
        console.log(response);
    } catch(err) {
        response = err.message;
    } finally {
        return response;
    }
})(); 

