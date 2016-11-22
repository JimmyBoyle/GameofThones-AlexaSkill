var helper = {

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    apiError: function(response) {
        response.ask("I'm sorry I couldn't find what you were looking for, please try again", "Try asking me for something, or say help");    
    },

    //TODO come up with more robust solution    
    fixHouseName: function(str) {
        str = str.toLowerCase();
        if (str.indexOf('stark') >= 0) {
            return 'House Stark of Winterfell';
        }
        if (str.indexOf('targaryen') >= 0) {
            return 'House Targaryen of King\'s Landing';
        }
        if (str.indexOf('tarly') >= 0) {
            return 'House Tarly of Horn Hill';
        }
        if (str.indexOf('tarth') >= 0) {
            return 'House Tarth of Evenfall Hall';
        }
        if (str.indexOf('lannister') >= 0) {
            return 'House Lannister of Casterly Rock';
        }
        if (str.indexOf('baratheon') >= 0) {
            return 'House Baratheon of Storm\'s End';
        }
        if (str.indexOf('bolton') >= 0) {
            return 'House Bolton of the Dreadfort';
        }
        if (str.indexOf('greyjoy') >= 0 ||str.indexOf('grayjoy') >= 0) {
            return 'House Greyjoy of Pyke';
        }
        if (str.indexOf('martell') >= 0) {
            return 'House Nymeros Martell of Sunspear';
        }
        return 'House ' + str;
    }
    
};
module.exports = helper;