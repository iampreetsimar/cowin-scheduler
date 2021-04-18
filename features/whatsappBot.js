let { whatsappWebUrl, whatsappConversationStarter } = require("../utils/constants");
let { waitAndClick, waitAndType } = require("../utils/common");

function initiateWhatsappBot(tab) {
    return new Promise(function(resolve, reject) {
        let openWhatsappWebPromise = tab.goto(whatsappWebUrl);
        openWhatsappWebPromise
            .then(function() {
                console.log("...opened whatsapp web client")
                let searchContactChatPromise = openContactChatPromise(tab, "Mumma");
                return searchContactChatPromise;
            }).then(function() {
                let startBotPromise = startBot(tab);
                return startBotPromise;
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    });
}

function openContactChatPromise(tab, contactName) {
    return new Promise(function(resolve, reject) {
        let searchForContactPromise = waitAndType(tab, "._2_1wd.copyable-text.selectable-text", contactName);
        searchForContactPromise
            .then(function() {
                console.log("...searching for contact");
                let openContactChat = waitAndClick(tab, "span[title='" + contactName + "']");
                return openContactChat;
            }).then(function() {
                console.log("...opened contact chat window");
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    })
}

function startBot(tab) {
    return new Promise(function(resolve, reject) {
        let startConversion = waitAndType(tab, "div[data-tab='6']", whatsappConversationStarter, 0);
        startConversion
            .then(function() {
                console.log("...typing message for bot");
            }).then(function() {
                resolve();
            }).catch(function(err) {
                reject(err);
            })
    })
}

module.exports = {
    initiateWhatsappBot: initiateWhatsappBot
}

