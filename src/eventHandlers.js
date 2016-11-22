var registerEventHandlers = function(eventHandlers, speechOutputType) {

    eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
        console.log("GameOfThronesWiki onSessionStarted requestId: " + sessionStartedRequest.requestId +
            ", sessionId: " + session.sessionId);
    };

    eventHandlers.onLaunch = function(launchRequest, session, response) {
        console.log("GameOfThronesWiki onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
        var speechOutput = "Welcome to the wiki for Game of Thrones characters, you can ask for character summaries, house summaries, if characters are alive, try asking what house Jon Snow is in";
        var repromptText = "Ask what house a character is in";
        response.ask(speechOutput, repromptText);
    };

    eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
        console.log("GameOfThronesWiki onSessionEnded requestId: " + sessionEndedRequest.requestId +
            ", sessionId: " + session.sessionId);
    };
};

exports.register = registerEventHandlers;