/**
 * Created by JinWYP on 7/26/16.
 */

const path         = require('path');
const express      = require('express');
const responseTime = require('response-time');
const morgan       = require('morgan');
const csurf        = require('csurf');
const compression  = require('compression');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet       = require('helmet');
const ejs          = require('ejs');
const app          = express();


var logger       = require("./express-libs/logger");
var errorHandler = require('./express-libs/errorhandler');

var config = require('./config');
var routes = require('./routes');


// 静态文件目录
var document  = path.join(__dirname, '../docs');
var staticDir  = path.join(__dirname, '../../frontend/src');
var fileStatic = config.path_file;
var viewHtmlPath = path.join(__dirname, 'views');

if (config.NODE_ENV !== 'development') viewHtmlPath = path.join(__dirname, '../dist/views');


// 设置 View 模版引擎
app.engine('ejs', ejs.__express);
app.engine('html', ejs.__express);

app.set('views', viewHtmlPath);
app.set('view engine', 'ejs');
app.enable('trust proxy');





//显示当前环境变量
if (config.debug) {
    logger.debug('----- NodeJS Environment Config Variable: ');
    logger.debug(config);

    app.use(morgan('dev')); //每个请求的显示日志
}



//加载 统计中间件
app.use(compression());
app.use(responseTime());  // Add Http Header 'X-Response-Time'.

//加载 解析 Body 中间件
app.use(bodyParser.json({limit : '1mb'}));
app.use(bodyParser.urlencoded({extended : true, limit : '1mb'}));
app.use(cookieParser(config.cookie_secret));

//加载 安全中间件
app.use(helmet());
app.use(csurf({ cookie: true }));

// 设置全局模版变量
app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    res.locals.staticPath = '/static';
    res.locals.siteUrl = config.homepage;
    res.locals.page = {
        title : '默认页面TITLE',
        url : req.url
    };
    return next()
});



// 静态资源路由
app.use('/static', express.static(staticDir));
app.use('/files',express.static(fileStatic));
app.use('/docs',express.static(document));


// 动态请求路由
//app.use(function (req, res, next) {
//    if (req.path.indexOf('/api') === -1) {
//        csurf()(req, res, next);
//        return;
//    }
//    next();
//});



app.use('/api', routes.api);
app.use('/', routes.webPage);




app.get('/form', function(req, res) {
    // pass the csrfToken to the view
    console.log(req.csrfToken())
    res.setHeader('x-csrf-token', req.csrfToken());
    res.render('page/demo', {msg:'', csrfToken: req.csrfToken() })
});

app.post('/process', function(req, res) {

    res.send( { msg: 'csrf was required to get here', csrfToken:'' } )
});


app.use(errorHandler.PageNotFoundMiddleware);


if (config.debug) {
    app.use(errorHandler.DevelopmentHandlerMiddleware);
} else {
    app.use(errorHandler.ProductionHandlerMiddleware);
}

app.set('port', config.port);

app.listen(config.port, function() {
    logger.info('----- NodeJS Server started on ' + config.homepage + ', press Ctrl-C to terminate.');
});

