/**
 * Created by JinWYP on 7/27/16.
 */

var requireDir = require('../express-libs/requiredir');


var apiRoutes = requireDir('./api', {type:'array'});
var pageRoutes = requireDir('./page', {type:'array'});

console.log('pageRoutes:', pageRoutes)
module.exports = {
    api : apiRoutes,
    webPage : pageRoutes
};

