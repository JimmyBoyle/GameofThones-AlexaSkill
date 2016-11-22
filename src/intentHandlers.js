var characterHouse = require("./intents/characterHouse");
var characterSummary = require("./intents/characterSummary");
var characterIsAlive = require("./intents/characterIsAlive");
var houseSummary = require("./intents/houseSummary");

var registerIntentHandlers = function(intentHandlers) {

    intentHandlers.CharacterHouseIntent = function(intent, session, response) {
        characterHouse.register(intent, session, response);
    };

    intentHandlers.CharacterSummaryIntent = function(intent, session, response) {
        characterSummary.register(intent, session, response);
    };

    intentHandlers.CharacterIsAliveIntent = function(intent, session, response) {
        characterIsAlive.register(intent, session, response);
    };

    intentHandlers.HouseSummaryIntent = function(intent, session, response) {
        houseSummary.register(intent, session, response);
    };

    intentHandlers["AMAZON.HelpIntent"] = function(intent, session, response) {
        var speechOutput = "You can ask for character summaries, house summaries, if characters are alive, try asking what house Jon Snow is in";
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