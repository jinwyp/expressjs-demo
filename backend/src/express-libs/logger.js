/**
 * Created by JinWYP on 7/27/16.
 */


var winston      = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var path         = require('path');

var config = require('../config');
var utils  = require('../express-libs/utils');


var pathLog = path.join(config.path_logs);
utils.mkdirpSync(pathLog);

var filenameDebug = pathLog +  config.NODE_ENV + '-debug.log';
var filenameInfo = pathLog + config.NODE_ENV + '-info.log';
var filenameError = pathLog + config.NODE_ENV + '-error.log';




var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({name:'debug-console', level: 'debug', colorize:true, timestamp:true, json:false, stringify:false, prettyPrint:true, handleExceptions: false, humanReadableUnhandledException:false }),
        //new (winston.transports.File)({ filename: filename }),

        new (winstonDaily)({ name: 'debug-file', level: 'debug', filename: filenameDebug, prepend:true, colorize:false, timestamp:true, json:false, stringify:false, prettyPrint:true, handleExceptions: false, humanReadableUnhandledException:true }),
        new (winstonDaily)({ name: 'error-file', level: 'error', filename: filenameError, prepend:true, colorize:false, timestamp:true, json:false, stringify:false, prettyPrint:true, handleExceptions: false, humanReadableUnhandledException:true })
    ],
    exitOnError: false
});



module.exports = logger;


