var getThronesData = require('../utilities/thronesApi');

var characterHouse = function(intent, session, response) {

    function test() {
        getThronesData.getCharacterByName("Jon Snow", function thronesCallback(thronesResponse) {
            console.log(thronesResponse[0]);
        });
    }
    test();
};

exports.register = characterHouse;