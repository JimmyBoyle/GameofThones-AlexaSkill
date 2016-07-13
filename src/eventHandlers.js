var registerEventHandlers = function(eventHandlers, speechOutputType) {

    eventHandlers.onSessionStarted = function(sessionStartedRequest, session) {
        console.log("GameOfThronesWiki onSessionStarted requestId: " + sessionStartedRequest.requestId +
            ", sessionId: " + session.sessionId);
    };

    eventHandlers.onLaunch = function(launchRequest, session, response) {
        console.log("GameOfThronesWiki onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
        var speechOutput = "Welcome to the Game of Thrones wiki, try saying a character's name";
        var repromptText = "Say a characters name to get their house";
        response.ask(speechOutput, repromptText);
    };

    eventHandlers.onSessionEnded = function(sessionEndedRequest, session) {
        console.log("GameOfThronesWiki onSessionEnded requestId: " + sessionEndedRequest.requestId +
            ", sessionId: " + session.sessionId);
    };
};

exports.register = registerEventHandlers;