/**
 * Created by Doga on 07/01/15.
 *
 */
var jwt = require('jsonwebtoken');
var fs = require('fs');
const private_key = fs.readFileSync('./keys/' + 'piarch_a');




function tokenReturn(user_info) {
    var token = null;
    var name = user_info.credentials.uid;
    var data = {
            sub: name,
            iss: 'piarch_a'
        },
        options = {
            algorithm: 'RS256',
            expiresIn: (10 * 60 * 60),
        };

    try {
        token = jwt.sign(data, private_key, options);
        console.log(token)
    } catch (err) {
        console.error(err);
    }
    return token;
}
module.exports = tokenReturn;
