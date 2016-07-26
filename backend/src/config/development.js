/**
 * Created by JinWYP on 7/26/16.
 */


var path = require('path');



module.exports = {

    debug : true,

    // 应用目录配置
    path_app  : path.join(__dirname, '../../../'),
    path_logs : path.join(__dirname, '../../../logs/'),


    // 文件目录配置
    path_file : path.join(__dirname, '../../../files/demo'),
    path_file_upload : path.join(__dirname, '../../../files/demo/upload'),
    path_file_upload_tmp : path.join(__dirname, '../../../files/demo/upload_tmp'),
    path_file_download : path.join(__dirname, '../../../files/demo/download')
};