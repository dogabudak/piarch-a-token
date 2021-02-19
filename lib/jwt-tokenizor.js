const jwt = require('jsonwebtoken');
const fs = require('fs');
const private_key = fs.readFileSync('./keys/' + 'piarch_a');

function tokenReturn(user_info) {
    let token ;
    const name = user_info.credentials.uid;
    const data = {
            sub: name,
            iss: 'piarch_a'
        },
        options = {
            algorithm: 'RS256',
            expiresIn: (10 * 60 * 60),
        };
        token = jwt.sign(data, private_key, options);
    return token;
}
module.exports = tokenReturn;
