var helper = {

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    apiError: function(response) {
        response.ask("I'm sorry I couldn't find what you were looking for, please try again", "Try asking me for something, or say help");    
    }
    
};
module.exports = helper;