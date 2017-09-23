/**
 * Created by doga on 09/11/2016.
 */
var fetchModule = require("fetch");

var token_options = {
    url: 'http://localhost:3012/login',
    headers: {
        'Authorize': 'basic RG9nYWIxMjM6MTIzNDU2',
        'X-Client-Type': 'D'
    }
};

fetchModule.fetch('http://localhost:3012/login', {
        method: "GET",
        headers: {
            'Authorize': 'basic MjEwMDE6RFJTTjk5OTk='
        }
    })
    .then(function(response) {
        console.log(response)
        return response.json();
    })
    .then(function(data) {
        config.token = data.Result.access_token;
    });