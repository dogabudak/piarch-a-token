/**
 * Created by kivanc on 07/01/15.
 */
module.exports = {
    'default_client_type': 'M',
    'mongo': {
        url: 'mongodb+srv://dogabudak:199100@piarkacluster.snpsj.mongodb.net/piarka?retryWrites=true&w=majority'
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

