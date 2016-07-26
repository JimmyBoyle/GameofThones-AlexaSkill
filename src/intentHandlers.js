var characterHouse = require("./intents/characterHouse");
var characterSummary = require("./intents/characterSummary");

var registerIntentHandlers = function(intentHandlers) {

    intentHandlers.CharacterHouseIntent = function(intent, session, response) {
        characterHouse.register(intent, session, response);
    };

    intentHandlers.CharacterSummaryIntent = function(intent, session, response) {
        characterSummary.register(intent, session, response);
    };

    intentHandlers["AMAZON.HelpIntent"] = function(intent, session, response) {
        var speechOutput = "Try asking what house a character is from, for example you can say, What house is Jon Snow in?";
        response.ask(speechOutput,speechOutput);
    };

    intentHandlers["AMAZON.StopIntent"] = function (intent, session, response) {
        var speechOutput = "Oh good, you made it out of Westeros alive, enjoy your journey";
        response.tell(speechOutput);
    };

    intentHandlers["AMAZON.CancelIntent"] = function (intent, session, response) {
        var speechOutput = "Oh good, you made it out of Westeros alive, enjoy your journey";
        response.tell(speechOutput);
    };
};

exports.register = registerIntentHandlers;