var AlexaSkill = require('../AlexaSkill');
var getThronesData = require('../utilities/thronesApi');
var helper = require('../utilities/helper');

var characterIsAlive = function(intent, session, response) {

    function setup() {
        var charName = intent.slots.CharacterName;
        if (charName && charName.value) {
            charName = helper.toTitleCase(String(charName.value));
            console.log("IsAliveIntent with character: " + charName);
            getCharacterDeath(charName);
        } else {
            response.ask("I'm sorry i didnt understand that name please repeat your phrase", "Please repeat your phrase");
        }
    }

    function getCharacterDeath(charName) {
        var i = 0;
        if (charName === "Daenerys Targaryen") {
            i = 1;
        }
        getThronesData.getCharacterByName(charName, function nameCallback(nameResponse) {
            if (nameResponse.length === 0) {
                helper.apiError(response);
            } else {
                var death = nameResponse[i].died;
                if (death.length === 0) {
                    response.tell(charName+" is currently alive... Well for now.");
                } else {
                    response.tell(charName + " died " + death);
                }
            }
        });
    }
    setup();
};

exports.register = characterIsAlive;