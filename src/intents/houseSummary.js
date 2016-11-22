var AlexaSkill = require('../AlexaSkill');
var getThronesData = require('../utilities/thronesApi');
var helper = require('../utilities/helper');

var houseSummary = function(intent, session, response) {

    function setup() {
        var houseName = intent.slots.HouseName;
        if (houseName && houseName.value) {
            houseName = helper.fixHouseName(String(houseName.value));
            houseName = helper.toTitleCase(houseName);
            console.log("House Summary Intent: " + houseName);
            getHouseInfo(houseName);
        } else {
            response.ask("I'm sorry i didnt understand that name please repeat your phrase", "Repeat");
        }
    }

    function getHouseInfo(houseName) {
        var i = 0;
        getThronesData.getHouseByName(houseName, function nameCallback(houseResponse) {
            if (houseResponse.length === 0) {
                helper.apiError(response);
                return;
            }
            var region = houseResponse[i].region,
                coatOfArms = houseResponse[i].coatOfArms,
                words = houseResponse[i].words,
                titles = houseResponse[i].titles,
                currentLord = houseResponse[i].currentLord;

            if (currentLord.length === 0) {
                currentLord = "";
            } else {
                currentLord = currentLord.substring(45);
            }

            getCharacterName(currentLord, function(currentLordName) {
                formatHouseInfo(houseName, region, coatOfArms, words, titles, currentLordName);
            });

        });

    }

    function getCharacterName(charId, callback) {
        if (charId === "") {
            callback("");
        } else {
            //TODO check this number for accuracy
            callback(getThronesData.getCharacterById(charId.substring(48)));
        }
    }

    function formatHouseInfo(houseName, region, coatOfArms, words, titles, currentLord) {
        var speechText = "",
            cardTitle,
            cardContent = "";
            
        
        if (houseName !== "") cardTitle = houseName;
        if (region !== "") {
            cardContent += "Region: " + region + "\n";
            speechText += houseName + " is in " + region + ". ";
        }
        if (coatOfArms !== "") {
            cardContent += "Coat of Arms: " + coatOfArms + "\n";
            speechText += "Their coat of arms is " + coatOfArms + ". ";
        }
        if (words !== "") {
            cardContent += "Words: " + words + "\n";
            speechText += "Their words are " + words + ". ";
        }
        if (currentLord !== "") {
            cardContent += "Current Lord: " + currentLord+"\n";
            speechOutput += "The current lord of " + houseName + " is " + currentLord + ". ";
        }
        if (titles.length >= 0) {
            cardContent += "Titles: ";
            speechText += " Their titles are ";
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

exports.register = houseSummary;