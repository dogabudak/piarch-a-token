/**
 * Created by doga on 22/10/2016.
 */
var sh = require('shelljs');
var options = require('../resources/config.js').logger;
var RotatingFileStream = require('bunyan-rotating-file-stream');
var logger;

module.exports = function() {
    sh.mkdir('-p', options.log_path);
    if (!logger) {
        logger = require('bunyan').createLogger({
            name: options.name,
            streams: [{
                stream: new RotatingFileStream(
                    options.rotating_file_stream_opts
                ),
                level: options.level
            }]
        })
    }
    return logger;

};