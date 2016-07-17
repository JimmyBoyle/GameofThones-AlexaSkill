var AlexaSkill = require('../AlexaSkill');
var getThronesData = require('../utilities/thronesApi');
var helper = require('../utilities/helper');

var characterHouse = function(intent, session, response) {

    function setup() {
        var charName = intent.slots.CharacterName;
        if (charName && charName.value) {
            charName = helper.toTitleCase(String(charName.value));
            getCharacterHouse(charName);
        } else {
            response.ask("I'm sorry i didnt understand that name please repeat your phrase", "Repeat");
        }
    }

    function getCharacterHouse(charName) {
        var i = 0;
        if (charName === "Daenerys Targaryen") {
            i = 1;
        }
        getThronesData.getCharacterByName(charName, function nameCallback(nameResponse) {
            var houses = nameResponse[i].allegiances;
            if (houses.length == 0) {
                response.tell("I'm sorry, I couldn't find any house for " + charName + ". There are just so many in 'A Song of Ice and Fire'.");
            } else {
                var houseId = houses[i].substring(44);
                getHouseName(houseId, charName);
            }
        });
    }

    function getHouseName(houseID, charName) {
        getThronesData.getHouseById(houseID, function houseCallback(houseResponse) {
            var houseName = houseResponse.name;
            var speechOutput = {
                speech: charName + " is of " + houseName,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, charName, houseName);
        });
    }
    setup();
};

exports.register = characterHouse;