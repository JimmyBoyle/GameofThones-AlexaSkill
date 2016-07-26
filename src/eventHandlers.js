var registerEventHandlers = function(eventHandlers, speechOutputType) {

    eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
        console.log("GameOfThronesWiki onSessionStarted requestId: " + sessionStartedRequest.requestId +
            ", sessionId: " + session.sessionId);
    };

    eventHandlers.onLaunch = function(launchRequest, session, response) {
        console.log("GameOfThronesWiki onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
        var speechOutput = "Welcome to the wiki for Game of Thrones characters, try asking what house a character is in";
        var repromptText = "Ask what house a character is in";
        response.ask(speechOutput, repromptText);
    };

    eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
        console.log("GameOfThronesWiki onSessionEnded requestId: " + sessionEndedRequest.requestId +
            ", sessionId: " + session.sessionId);
    };
};

exports.register = registerEventHandlers;