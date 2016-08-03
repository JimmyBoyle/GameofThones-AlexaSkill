/**
 * Uses A song of ice and fire Api to get data
 */

var http = require('http');
var helper = require('./helper');

var getThronesData = {

    makeThroneApiRequest: function(url, thronesCallback) {
        http.get(url, function(res) {
            var body = "";

            res.on("data", function(chunk) {
                body += chunk;
            });

            res.on("end", function() {
                thronesCallback(JSON.parse(body));
            });
        }).on("error", function(e) {
            thronesCallback(new Error(e.message));
        });
    },

    //Books
    getBookById: function(bookId, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/books/' + bookId;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getBookByName: function(bookName, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/books/' + bookName;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getAllBooks: function(thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/books/';
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    //Characters

    getCharacterById: function(characterId, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/characters/' + characterId;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getCharacterByName: function(characterName, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/characters/?name=' + characterName;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getCharactersByCulture: function(cultureName, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/characters/?culture=' + cultureName;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getCharactersByGender: function(gender, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/characters/?gender=' + gender;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getAllCharacters: function(thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/characters/';
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    //Houses
    getHouseById: function(houseId, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/houses/' + houseId;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getHouseByName: function(houseName, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/houses/?name=' + houseName;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getHouseByRegion: function(region, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/houses/?region=' + region;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getHouseByWords: function(words, thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/houses/?words=' + words;
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    },

    getAllHouses: function(thronesCallback) {
        var url = 'http://www.anapioficeandfire.com/api/houses/';
        this.makeThroneApiRequest(url, function thronesApiCallback(thronesResponse) {
            thronesCallback(thronesResponse);
        });
    }
};
module.exports = getThronesData;