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

var filenameDebug = pathLog +  config.NODE_ENV + '-%DATE%-debug.log';
var filenameInfo = pathLog + config.NODE_ENV + '-%DATE%-info.log';
var filenameError = pathLog + config.NODE_ENV + '-%DATE%-error.log';


let winstonFormat = winston.format.json();
if (config.NODE_ENV === "development") {
    winstonFormat = winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        // winston.format.simple(),
        winston.format.align(),
        winston.format.printf(info => {
            const { timestamp, level, message, ...extra } = info;

            return `${timestamp} [${level}]: ${message} ${ Object.keys(extra).length ? JSON.stringify(extra, null, 4) : ''}`;
        }),
    );
}

var logger = winston.createLogger({
    format: winstonFormat,
    transports: [
        new winston.transports.Console({name:'debug-console', level: 'debug', colorize:true, timestamp:true, json:false, stringify:false, prettyPrint:true, handleExceptions: false, humanReadableUnhandledException:false }),
        //new winston.transports.File({ filename: filename }),

        new (winstonDaily)({ name: 'debug-file', level: 'debug', filename: filenameDebug, prepend:true, colorize:false, timestamp:true, json:false, stringify:false, prettyPrint:true, handleExceptions: false, humanReadableUnhandledException:true }),
        new (winstonDaily)({ name: 'error-file', level: 'error', filename: filenameError, prepend:true, colorize:false, timestamp:true, json:false, stringify:false, prettyPrint:true, handleExceptions: false, humanReadableUnhandledException:true })
    ],
    exitOnError: false
});



module.exports = logger;


