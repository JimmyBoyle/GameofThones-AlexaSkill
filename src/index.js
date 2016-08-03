/**
 *
 *
 */


var APP_ID = "amzn1.echo-sdk-ams.app.c1225c01-57dc-41e3-8f04-1ba2e2740464";

var AlexaSkill = require("./AlexaSkill");
var intentHandlers = require("./intentHandlers");
var eventHandlers = require("./eventHandlers");

var GameOfThronesWiki = function() {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
GameOfThronesWiki.prototype = Object.create(AlexaSkill.prototype);
GameOfThronesWiki.prototype.constructor = GameOfThronesWiki;

intentHandlers.register(GameOfThronesWiki.prototype.intentHandlers);
eventHandlers.register(GameOfThronesWiki.prototype.eventHandlers, AlexaSkill.speechOutputType);

exports.handler = function(event, context) {
    // Create an instance of the HelloWorld skill.
    var gameOfThronesWiki = new GameOfThronesWiki();
    gameOfThronesWiki.execute(event, context);
};