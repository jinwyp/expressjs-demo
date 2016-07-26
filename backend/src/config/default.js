/**
 * Created by JinWYP on 7/26/16.
 */

/**
 * config
 */

var path = require('path');

module.exports = {

    debug : false, // debug 为 true 时，用于本地调试
    mock  : !!(process.env.MOCK === 'true' || process.env.MOCK === true),
    NODE_ENV : process.env.NODE_ENV || 'development',

    https    : false,
    domain   : 'pay-local.yimei180.com',
    port     : 3000, // 程序运行的端口
    homepage : 'http://pay-local.yimei180.com:3000',

    session_secret   : 'this_is_yimeis_secret_key_node_redis__cache_long_',
    auth_cookie_name : 'signed_cookie_username',

    passport : {
        member     : 'https://member-local.yimei180.com',
        pay        : 'https://pay-local.yimei180.com',
        cookieName : 'passport'
    },


    // 应用目录配置
    path_app  : path.join(__dirname, '../../../'),
    path_logs : path.join(__dirname, '../../../logs/'),


    // 文件目录配置
    path_file : path.join(__dirname, '../../../files/demo'),
    path_file_upload : path.join(__dirname, '../../../files/demo/upload'),
    path_file_upload_tmp : path.join(__dirname, '../../../files/demo/upload_tmp'),
    path_file_download : path.join(__dirname, '../../../files/demo/download'),


    redis : {
        host : '127.0.0.1',
        port : 6379,
        db   : 0
    },

    redis_notification : {
        host : '127.0.0.1',
        port : 6379,
        db   : 0
    },


    api_member : 'http://10.100.20.3:3000',
    api_javaService  : 'http://10.100.30.1:8080/',
    site_page      : 'https://www.yimei180.com',

    notification_queue : 'mail-queue',
    emailTo                 : 'server@yimei180.com',
    emailFrom               : 'auto_server@yimei180.com'
};
