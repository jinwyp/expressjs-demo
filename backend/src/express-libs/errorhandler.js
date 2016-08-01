/**
 * Created by JinWYP on 5/30/16.
 */

var inspect        = require('util').inspect;
var PrettyErrorLib = require('pretty-error');
var PrettyError    = new PrettyErrorLib();
PrettyError.skipNodeFiles(); // this will skip events.js and http.js and similar core node files, this will skip node.js, path.js, event.js, etc.
PrettyError.skipPackage('express', 'mongoose'); // this will skip all the trace lines about express` core and sub-modules

var logger = require('../express-libs/logger');
var config = require('../config');

var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');
var PageNotFoundError       = require('../errors/PageNotFoundError');
var SystemError             = require('../errors/SystemError');





exports.PageNotFoundMiddleware = function(req, res, next) {
    next(new PageNotFoundError(404 , 'Page Not Found'));
};



exports.DevelopmentHandlerMiddleware = function(err, req, res, next) {
    var newErr = err;

    if (typeof err.type === 'undefined'){
        newErr = new SystemError(500, err.message||'系统出错了，正在解决中', err);
        if (err && typeof err.stack !== 'undefined'){newErr.stack = err.stack;}
    }

    if (typeof err !== 'undefined' && err.name === 'ForbiddenError' && err.code === 'EBADCSRFTOKEN') {
        newErr = new UnauthorizedAccessError(401, 'CSRF Token Invalid!');
    }

    res.status(newErr.status);

    // Security Header for content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');

    logger.debug(PrettyError.render(newErr));

    var resError = {
        success : false,
        type : newErr.type,
        name : newErr.name,
        message: newErr.message,
        status: newErr.status,
        errorCode: newErr.code,
        field: newErr.field,
        stack: newErr.stack,
        error: newErr,
        inspect:inspect(newErr),
        page : {
            url : req.url,
            title : '500 系统错误, 请稍后重试!'
        }
    };


    var type = req.accepts('html', 'json', 'text');
    //console.log(type, resError.code, req.get('Content-Type'), req.is('application/x-www-form-urlencoded'), req.is('application/json'));

    if (req.xhr || req.is('application/json') || (req.is('application/x-www-form-urlencoded') && req.xhr) || req.get('Content-Type') === 'application/json' || type ==='json' ){
        return res.json(resError);

    }else if (type === 'text'){
        res.setHeader('Content-Type', 'text/plain');
        return res.json(resError);

    }else {
        if (resError.errorCode >= 1000) {
            resError.page.title = 'Field validation Error, 提交的数据不符合规格!';
            return res.render('errors/validationErrorPage', resError);
        }

        if (resError.errorCode === 404) {
            resError.page.title = '404 Page Not Found, 抱歉,页面没有找到!';
            return res.render('errors/page404', resError);
        }

        return res.render('errors/error', resError);
    }

};



exports.ProductionHandlerMiddleware = function(err, req, res, next) {
    var newErr = err;

    if (typeof err.type === 'undefined'){
        newErr = new SystemError(500, err.message||'系统出错了，正在解决中', err);
        if (err && typeof err.stack !== 'undefined'){newErr.stack = err.stack;}
    }

    if (resError.errorCode === 404) {
        logger.warn(newErr);
    }else if (resError.errorCode >= 500){
        logger.error(newErr);

        //当是nodejs报错,并且是500错误
        if(newErr.status===500) {
            var message = 'requestHeader:\t' + JSON.stringify(req.headers) +
                '\nrequestUrl:\t' + req.originalUrl +
                '\nformData:\t' + JSON.stringify(req.query) +
                '\nrequestBody:\t' + JSON.stringify(req.body) +
                '\n' + newErr.message+newErr.stack;

            var smsMessage = {
                from    : config.emailFrom,
                to      : config.emailTo,
                cc      : '',
                subject : 'pay system alert',
                body    : message
            };
            logger.error(smsMessage);
            //cache.pub(config.notification_queue,JSON.stringify(smsMessage));
        }

    }else if (resError.errorCode >= 1000){

    }else{
        logger.error(newErr);
    }


    res.status(newErr.status);

    // Security Header for content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');


    var resError = {
        success : false,
        type : newErr.type,
        name : newErr.name,
        message: newErr.message,
        status: newErr.status,
        errorCode: newErr.code,
        field: newErr.field,
        page : {
            url : req.url,
            title : '500 系统错误, 请稍后重试!'
        }
    };


    var type = req.accepts('html', 'json', 'text');


    if (req.xhr || req.is('application/json') || (req.is('application/x-www-form-urlencoded') && req.xhr) || req.get('Content-Type') === 'application/json' || type ==='json' ){
        return res.json(resError);

    }else if (type === 'text'){
        res.setHeader('Content-Type', 'text/plain');
        return res.json(resError);

    }else{
        if (resError.errorCode > 1000) {
            resError.page.title = 'Field validation Error, 提交的数据不符合规格!';
            return res.render('errors/validationErrorPage', resError);
        }

        if (resError.errorCode === 404) {
            resError.page.title = '404 Page Not Found, 抱歉,页面没有找到!';
            return res.render('errors/page404', resError);
        }

        return res.render('errors/error', resError);
    }
};






// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error){
    var newError = null;

    if (typeof error.type === 'undefined'){
        newError = new SystemError(500, error.message, error);
        newError.stack = error.stack;
    }else{
        newError = error;
    }

    logger.error('5XX UncaughtException: ', newError);

    process.exit(1);
});



// To render unhandled rejections created in BlueBird:
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p){
    logger.error('5XX UnhandledRejection at Promise: ', JSON.stringify(p), '. Reason: ', reason);
});



// While PrettyError.start() works out of the box with when.js` unhandled rejections,
// now that wer'e manually rendering errors, we have to instead use npmjs.org/packages/pretty-monitor
// to handle when.js rejections.