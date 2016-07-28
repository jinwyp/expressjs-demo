/**
 * Created by JinWYP on 7/26/16.
 */

var colorConverter = require('../../business-libs/colorConverter');


exports.rgbToHex = function (req, res, next) {

    var red   = parseInt(req.query.red, 10);
    var green = parseInt(req.query.green, 10);
    var blue  = parseInt(req.query.blue, 10);

    var hex = colorConverter.rgbToHex(red, green, blue);

    return res.send(hex);
};

exports.hexToRgb = function (req, res, next) {

    var hex = req.query.hex;

    var rgb = colorConverter.hexToRgb(hex);

    return res.send(JSON.stringify(rgb));

};

