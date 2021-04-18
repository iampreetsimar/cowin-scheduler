// /*
//     FEATURE TO BE ADDED IN NEXT ITERATION
// */

// let { whatsappWebUrl, whatsappContactName } = require("../utils/constants");
// let { waitAndClick, waitAndType, sleep } = require("../utils/common");
// let { botResponse } = require("../utils/whatsappBotResponses");
// let { loginUser } = require("../features/loginUser");
// let { registerUser } = require("../features/registerUser");
// let { scheduleAppointment } = require("../features/scheduleAppointment");
// let { cancelAppointment } = require("../features/cancelAppointment");
// let { deleteUserDetails } = require("../features/deleteUserDetails");

// function initiateWhatsappBot(tab, browserInstance) {
//     return new Promise(function(resolve, reject) {
//         let openWhatsappWebPromise = tab.goto(whatsappWebUrl);
//         openWhatsappWebPromise
//             .then(function() {
//                 console.log("...opened whatsapp web client")
//                 let searchContactChatPromise = openContactChatPromise(tab, whatsappContactName);
//                 return searchContactChatPromise;
//             }).then(function() {
//                 let startBotPromise = startBotConversation(tab, browserInstance);
//                 return startBotPromise;
//             }).then(function() {
//                 resolve();
//             }).catch(function(err) {
//                 reject(err);
//             })
//     });
// }

// function openContactChatPromise(tab, contactName) {
//     return new Promise(function(resolve, reject) {
//         let searchForContactPromise = waitAndType(tab, "._2_1wd.copyable-text.selectable-text", contactName);
//         searchForContactPromise
//             .then(function() {
//                 console.log("...searching for contact");
//                 let openContactChat = waitAndClick(tab, "span[title='" + contactName + "']");
//                 return openContactChat;
//             }).then(function() {
//                 console.log("...opened contact chat window");
//                 resolve();
//             }).catch(function(err) {
//                 reject(err);
//             })
//     })
// }

// function startBotConversation(tab, browserInstance) {
//     return new Promise(function(resolve, reject) {
//         let startConversion = sendMessageToContact(tab, botResponse.initialMessage);
//         startConversion
//             .then(function() {
//                 let botConversation = converseWithBot(tab, browserInstance);
//                 return botConversation;
//             }).then(function() {
//                 resolve();
//             }).catch(function(err) {
//                 reject(err);
//             })
//     })
// }

// function converseWithBot(tab, browserInstance) {
//     return new Promise(function(resolve, reject) {
//         let sendRepeatedMessage = sendMessageToContact(tab, botResponse.repeatedMessage);
//         sendRepeatedMessage
//             .then(function() {
//                 return sleep(10000);
//             }).then(function() {
//                 let contactResponse = getContactResponse(tab);
//                 return contactResponse;
//             }).then(function(contactResponse) {
//                 let processBasedOnContactResponse = chooseProcessBasedOnContactResponse(tab, contactResponse, browserInstance);
//                 return processBasedOnContactResponse;
//             }).then(function() {
//                 resolve();
//             }).catch(function(err) {
//                 reject(err);
//             });
//     });
// }

// function sendMessageToContact(tab, message) {
//     return new Promise(function(resolve, reject) {
//         let sendMessagePromise = waitAndType(tab, "div[data-tab='6']", message, 0);
//         sendMessagePromise
//             .then(function() {
//                 resolve();
//             }).catch(function(err) {
//                 reject();
//             });
//     });
// }

// function getContactResponse(tab) {
//     return new Promise(function(resolve, reject) {
//         function browserReceiveMessage(selector) {
//             let receiverMessages = document.querySelectorAll(selector);
//             receiverMessages = receiverMessages[receiverMessages.length - 1];
//             let receiverResponse = Number(receiverMessages.innerText);
//             console.log(receiverResponse);
//             return receiverResponse;
//         }

//         let evaluatePromise = tab.evaluate(browserReceiveMessage, ".GDTQm.message-in ._24wtQ._2W7I-._1-U5A .copyable-text ._3-8er.selectable-text.copyable-text");
//         evaluatePromise
//             .then(function(incomingMessage) {
//                 resolve(incomingMessage);
//             }).catch(function(err) {
//                 reject(err);
//             });
//     });
// }

// function chooseProcessBasedOnContactResponse(tab, contactResponse, browserInstance) {
//     return new Promise(function(resolve, reject) {
//         let choicePromise;
//         if(contactResponse == 1) {
//             choicePromise = scheduleAppointmentChoice(tab, browserInstance);
//         }else if(contactResponse == 2) {
//             choicePromise = cancelAppointmentChoice(tab, browserInstance);
//         } else if(contactResponse == 3) {
//             choicePromise = deleteUserDetailsChoice(tab, browserInstance);
//         } else if(contactResponse == 0) {
//             choicePromise = exitChoice(tab, browserInstance);
//         } else {
//             choicePromise = converseWithBot(tab, browserInstance);
//         }

//         choicePromise
//             .then(function() {
//                 resolve();
//             }).catch(function(err) {
//                 reject(err);
//             })
//     });
// }

// function scheduleAppointmentChoice(tab, browserInstance) {
//     return new Promise(function(resolve, reject) {
//         let dataPromise = sendMessageToContact(tab, botResponse.choiceOneDataFormat);
//         dataPromise
//             .then(function() {
//                 return sleep(180000);
//             }).then(function() {
//                 let receiverMessage = getContactResponse(tab);
//                 return receiverMessage;
//             }).then(function(data) {
//                 console.log(data);
//             }).then(function() {
//                 resolve();
//             }).catch(function(err) {
//                 reject(err);
//             })
//         // let sendMessage = sendMessageToContact(tab, botResponse.processChoiceOne);
//         // sendMessage
//         //     .then(function() {
//         //         let newTabPromise = browserInstance.newPage();
//         //         return newTabPromise;
//         //     }).then(function(newTab) {
//         //         let loginProcess = loginUser()
//         //     })
//     });
// }

// function cancelAppointmentChoice(tab, browserInstance) {

// }

// function deleteUserDetailsChoice(tab, browserInstance) {

// }

// function exitChoice(tab, browserInstance) {

// }

// module.exports = {
//     initiateWhatsappBot: initiateWhatsappBot
// }

