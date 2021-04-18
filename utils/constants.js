module.exports = {
    cancellationMailBody: "Your appoinment has been cancelled on the Cowin Portal.",
    cancellationMailSubject: "Cowin Scheduler - Covid Vaccination Appointment Cancelled",
    confirmationMailSubject: "Cowin Scheduler - Covid Vaccination Appointment Confirmation",
    deleteUserDetailsMailSubject: "Cowin Scheduler - User Details Deleted",
    deleteUserDetailsMailBody: "Your details has been deleted from the Cowin Portal.",
    mappedPhotoIdSelector: {
        "AadhaarCard": "mat-option-0",
        "DrivingLicense": "mat-option-1",
        "PANCard": "mat-option-2",
        "Passport": "mat-option-3",
        "PensionPassbook": "mat-option-4",
        "NPRSmartCard": "mat-option-5",
        "VoterIDCard": "mat-option-6"
    },
    mappedGenderRadioSelector: {
        "Male": "mat-radio-2-input",
        "Female": "mat-radio-3-input",
        "Others": "mat-radio-4-input"
    },
    whatsappWebUrl: "https://web.whatsapp.com/",
    cowinPortalLoginPageUrl: "https://selfregistration.cowin.gov.in/",
    whatsappConversationStarter: 
        "Welcome to Cowin Scheduler. This bot can help you in scheduling an appointment for Covid Vaccination, cancel an existing appointment and deleting user details of a registered user on the Cowin Portal. Please Select - 1 : To schedule an appointment, 2 : To cancel your existing appointment, 3 : To delete your registered details, 0 : Exit \n"
}

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
*/