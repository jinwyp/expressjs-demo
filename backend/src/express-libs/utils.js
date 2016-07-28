/**
 * Created by JinWYP on 7/27/16.
 */


var fs   = require('fs');
var path = require('path');

var PATH_SEPARATOR = path.normalize('/');


exports.isDirExistsSync = function (dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
};


exports.isFileExistsSync = function (filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
};




exports.mkdirpSync = function (pathStr) {
    var pathArray = path.normalize(pathStr).split(PATH_SEPARATOR);
    var resolvedPath = pathArray[0];

    pathArray.forEach(function (pathname) {
        if (!pathname || pathname.substr(-1, 1) === ':') return;
        resolvedPath += PATH_SEPARATOR + pathname;

        var stat;

        try {
            stat = fs.statSync(resolvedPath);
        } catch (e) {
            if (e.code === 'ENOENT') {
                fs.mkdirSync(resolvedPath);
            }

            // var fd;
            // try {
            //     fd = fs.openSync(resolvedPath, 'w', 438); // 0666
            // } catch(e) {
            //     fs.chmodSync(resolvedPath, 438);
            //     fd = fs.openSync(resolvedPath, 'w', 438);
            // }
            // if (fd) {
            //     fs.closeSync(fd);
            // }
        }
        if (stat && stat.isFile()){ throw new Error(pathStr + 'is a file'); }
        if (stat && !stat.isDirectory()){ throw new Error(pathStr + 'is not a directory'); }
    });
};


