var AlexaSkill = require('../AlexaSkill');
var getThronesData = require('../utilities/thronesApi');
var helper = require('../utilities/helper');

var characterSummary = function(intent, session, response) {

    function setup() {
        var charName = intent.slots.CharacterName;
        if (charName && charName.value) {
            charName = helper.toTitleCase(String(charName.value));
            getCharacterInfo(charName);
        } else {
            response.ask("I'm sorry i didnt understand that name please repeat your phrase", "Repeat");
        }
    }

    function getCharacterInfo(charName) {
        var i = 0;
        if (charName.toUpperCase() === "DAENERYS TARGARYEN" ) {
            i = 1;
        }
        getThronesData.getCharacterByName(charName, function nameCallback(nameResponse) {
            if (nameResponse.length === 0) {
                helper.apiError(response);
                return;
            }
            var culture = nameResponse[i].culture,
                born = nameResponse[i].born,
                died = nameResponse[i].died,
                aliases = nameResponse[i].aliases,
                titles = nameResponse[i].titles,
                father = nameResponse[i].father,
                mother = nameResponse[i].mother,
                spouse = nameResponse[i].spouse,
                houses = nameResponse[i].allegiances,
                gender = nameResponse[i].gender;

            if (houses.length === 0) {
                houses = null;
            } else {
                houses = houses[0].substring(44);
            }
            console.log("HOUSE NAME: " + houses);
            getHouseName(houses, function(houseName) {
                getCharacterName(father, function(fatherName) {
                    getCharacterName(mother, function(motherName) {
                        getCharacterName(spouse, function(spouseName) {
                            formatCharacterInfo(charName, culture, born, died, aliases, titles, houseName, fatherName, motherName, spouseName, gender, response);
                        });
                    });
                });
            });

        });
    }

    function getHouseName(houseID, callback) {
        if (houseID === null) {
            callback("");
        } else {
            getThronesData.getHouseById(houseID, function houseCallback(houseResponse) {
                var houseName = houseResponse.name;
                callback(houseName);
            });
        }
    }

    function getCharacterName(charId, callback) {
        if (charId === "") {
            callback("");
        } else {
            //TODO check this number for accuracy
            callback(getThronesData.getCharacterById(charId.substring(48)));
        }
    }

    function formatCharacterInfo(charName, culture, born, died, aliases, titles, houseName, fatherName, motherName, spouseName, gender, response) {
        var speechText = "",
            cardTitle,
            cardContent ="",
            heShe = "She",
            hisHer = "Her",
            areWere = "were",
            isWas = "was";

        if (gender === "Male") {
            heShe = "He";
            hisHer = "His";
        }
        if (died == "") {
            isWas = "is";
            areWere = "are";
        }
        if (charName !== "") cardTitle = charName;
        if (culture !== "") {
            cardContent += "Culture: " + culture + "\n";
            speechText += charName + " " + isWas + " a " + culture + ". ";
        }
        if (houseName !== "") {
            cardContent += "House: " + houseName + "\n";
            speechText += heShe + " " + isWas + " from " + houseName + ". ";
        }
        if (born !== "") {
            cardContent += "Born: " + born + "\n";
            speechText += heShe + " was born " + born + ". ";
        }
        if (died !== "") {
            cardContent += "Died: " + died + "\n";
            speechText += heShe + " died " + died + ". ";
        }
        if (fatherName !== "" && motherName !== "") {
            cardContent += "Father: " + fatherName + "\n";
            cardContent += "Mother: " + motherName + "\n";
            speechText += hisHer + " father and mother are " + fatherName + " and " + motherName + ". ";
        } else if (fatherName !== "") {
            cardContent += "Father: " + fatherName + "\n";
            speechText += hisHer + " father " + isWas + fatherName + ". ";
        } else if (motherName !== "") {
            cardContent += "Mother: " + motherName + "\n";
            speechText += hisHer + " mother " + isWas + motherName + ". ";
        }
        if (spouseName !== "") {
            cardContent += "Spouse: " + spouseName + "\n";
            speechText += heShe + " " + isWas + " married to " + spouseName + ". ";
        }
        if (aliases.length >= 0) {
            cardContent += "Aliases: ";
            speechText += heShe + " " + isWas + " also called ";
            for (var i = 0; i < aliases.length; i++) {
                var alisas = aliases[i];
                cardContent += alisas + ", ";
                speechText += alisas + " and ";
            }
            cardContent = cardContent.substring(0, cardContent.length - 2) + "\n";
            speechText = speechText.substring(0, speechText.length - 5) + ". ";
        }
        if (titles.length >= 0) {
            cardContent += "Titles: ";
            speechText += hisHer + " titles " + areWere + " ";
            for (var j = 0; j < titles.length; j++) {
                var title = titles[j];
                cardContent += title + ", ";
                speechText += title + " and ";
            }
            cardContent = cardContent.substring(0, cardContent.length - 2) + "\n";
            speechText = speechText.substring(0, speechText.length - 5) + ". ";
        }
        var speechOutput = {
            speech: "<speak>" + speechText + "</speak>",
            type: AlexaSkill.speechOutputType.SSML
        };

        response.tellWithCard(speechOutput, cardTitle, cardContent);
    }


    setup();
};

exports.register = characterSummary;