var characterHouse = require("./intents/characterHouse");

var registerIntentHandlers = function(intentHandlers) {

    intentHandlers.CharacterHouseIntent = function(intent, session, response) {
        characterHouse.register(intent, session, response);
    };
};

exports.register = registerIntentHandlers;