/**
 * Created by kivanc on 07/01/15.
 */
module.exports = {
    'default_client_type': 'M',
    'mongo': {
        url: 'mongodb://localhost:27017/users'
    },
    'server': {
        'port': 3012,
        'path': '/login'
    },
    JWT: {
        'ttl': 30,
        'issuer': 'piarch_a'
    }
}

