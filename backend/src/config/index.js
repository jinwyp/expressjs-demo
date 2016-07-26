/**
 * Created by JinWYP on 7/26/16.
 */


var defaultConfig = require('./default.js');


var mode = process.env.NODE_ENV || 'development';
var currentConfig = require('./' + mode);


module.exports = Object.assign({}, defaultConfig, currentConfig);


