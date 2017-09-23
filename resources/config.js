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
    }
    ,
    'redis': {
        'redis_ip': '127.0.0.1',
        'redis_port':6379,
        'db':4
    }
    ,
    JWT: {
        'ttl': 30,
        'issuer': 'piarch_a'
    }
    ,
    activityLogsAddr: 'tcp://127.0.1.:8059',
    logger: {
        name: 'jwt_generator_http',
        log_path: './jwt_generator_http',
        rotating_file_stream_opts: {
            path: './jwt_generator_http.log',
            period: '1d',
            rotateExisting: true,
            threshold: '10m',
            totalSize: '50m'
        }
        ,
        level: 'error'
    }
}

