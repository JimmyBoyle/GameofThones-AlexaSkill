var AlexaSkill = require('../AlexaSkill');
var getThronesData = require('../utilities/thronesApi');
var helper = require('../utilities/helper');

var characterSummary = function(intent, session, response) {

    function setup() {
        var charName = intent.slots.CharacterName;
        if (charName && charName.value) {
            charName = helper.toTitleCase(String(charName.value));
            getCharacterHouse(charName);
        } else {
            response.ask("I'm sorry i didnt understand that name please repeat your phrase", "Repeat");
        }
    }

    function getCharacterInfo(charName) {
        var i = 0;
        if (charName === "Daenerys Targaryen") {
            i = 1;
        }
        getThronesData.getCharacterByName(charName, function nameCallback(nameResponse) {
            //TODO - check for empty return
            var culture = nameResponse[i].culture,
                born = nameResponse[i].born,
                died = nameResponse[i].died,
                aliases = nameResponse[i].aliases,
                titles = nameResponse[i].titles,
                father = nameResponse[i].father,
                spouse = nameResponse[i].spouse,
                houses = nameResponse[i].allegiances,
                gender = nameResponse[i].gender;

            if (houses.length === 0) {
                houses = null;
            } else {
                houses = houses[i].substring(44);
            }
            getHouseName(houses, function(houseName) {
                getCharacterName(father, function(fatherName) {
                    getCharacterName(mother, function(motherName) {
                        getCharacterName(spouse, function(spouseName) {
                            formatCharacterInfo(charName, culture, born, died, aliases, titles, father, spouse, houseName, fatherName, motherName, spouseName, gender);
                        });
                    });
                });
            });

        });
    }

    function getHouseName(house, callback) {
        if (house === null) {
            callback(null);
        } else {
            getThronesData.getHouseById(houseID, function houseCallback(houseResponse) {
                var houseName = houseResponse.name;
            });
        }
    }

    function getCharacterName(charId, callback) {
        if (charName === "") {
            callback(null);
        } else {
            //TODO check this number for accuracy
            callback(getThronesData.getCharacterById(charId.substring(48)));
        }
    }

    function formatCharacterInfo(charName, culture, born, died, aliases, titles, father, spouse, houseName, fatherName, motherName, spouseName) {
        var speechText = "",
            cardTitle,
            cardContent,
            gender = "She",
            isWas = "was";

        if (gender === "Male") gender = "Se";
        if (died !== "") isWas = "is";
        if (charName !== "") cardTitle = charName;
        if (culture !== "") {
            cardContent += "Culture: " + culture + "\n";
            speechText += charName + isWas + culture + ".";
        }
        if (born !== "") {
            cardContent += "Born: " + born + "\n";
            speechText += gender + " was born " + born;
        }
        if (died !== "") {
            cardContent += "Died: " + died + "\n";
            speechText += gender + " died " + died;
        }
        if (father !== "" && mother !== "") {
            cardContent += "Father: " + father + "\n";
            cardContent += "Mother: " + mother + "\n";
            speechText += gender
        }
    }


    setup();
};

exports.register = characterSummary;