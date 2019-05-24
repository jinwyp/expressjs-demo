/**
 * Created by JinWYP on 7/27/16.
 */


var path = require('path');
var fs = require('fs');

// http://www.wiredprairie.us/blog/index.php/archives/1974


// https://github.com/aseemk/requireDir/blob/master/index.js
// make a note of the calling file's path, so that we can resolve relative
// paths. this only works if a fresh version of this module is run on every
// require(), so important: we clear the require() cache each time!
var parent = module.parent;
var parentFile = parent.filename;
var parentDir = path.dirname(parentFile);
delete require.cache[__filename];





var requireDir = function(newDirName, models){

    models = models || {};
    // var currentFile = path.basename(__filename);
    var modelFiles = fs.readdirSync(newDirName);


    // loop through all of the files in the current directory
    for(var i= 0, len = modelFiles.length; i < len; i++) {

        var file = modelFiles[i];
        var fileExt = '';
        var fileBasename = '';

        var nextDirname = path.resolve(newDirName, file);
        var nextDirnameStats = fs.statSync(nextDirname);

        if (nextDirnameStats.isDirectory()){
            models = requireDir(nextDirname, models);
        }else {
            fileExt = path.extname(file);
            fileBasename = path.basename(file, fileExt);

            // ignore this file (via global NodeJS variable)
            if( fileExt.toLowerCase() !== '.js') {
                continue;  // skip the current file and anything without a "JS" extension

            }else {
                models[fileBasename] = path.join(newDirName, file);
            }
        }

    }
    
    return models;
};





var initialize = function(sourceDirName, options) {

    options.type = options.type || 'object';

    if (options)
        sourceDirName = sourceDirName || '.';
    // resolve the path to an absolute one:
    sourceDirName = path.resolve(parentDir, sourceDirName);


    var files = requireDir(sourceDirName, {});


    var result;

    if (options.type === 'object'){
        result = {};
        for (var basename in files) {
            result[basename] = require(files[basename]);
        }
    }

    if (options.type === 'array'){
        result = [];
        for (var basename in files) {
            result.push (require(files[basename]));
        }
    }

    return result;
};



module.exports = initialize;
