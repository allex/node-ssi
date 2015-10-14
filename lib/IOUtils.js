"use strict";

var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

// Export the IOUtils class for use
module.exports = IOUtils;


function IOUtils(documentRoot) {
    this.documentRoot = documentRoot;
}

IOUtils.prototype = {

    /* Public Methods */

    resolvePath: function(currentFile, file) {
        if (file.indexOf("/") === 0) {
            // If we have an absolute path, resolve against the document root
            file = path.resolve(this.documentRoot, file.substr(1));
        } else {
            // Otherwise resolve the file against the current file
            file = path.resolve(path.dirname(currentFile), file);
        }
        return file;
    },

    readFileSync: function(currentFile, file) {
        var filename = this.resolvePath(currentFile, file);
        return fs.readFileSync(filename, {encoding: "utf8"});
    },

    readVirtualSync: function(currentFile, file) {
        return this.readFileSync(currentFile, file);
    },

    writeFileSync: function(filename, contents) {
        var directory = path.dirname(filename);

        if (!fs.existsSync(directory)) {
            // If the file's directory doesn't exists, recursively create it
            //noinspection JSUnresolvedFunction
            mkdirp.sync(directory);
        }

        fs.writeFileSync(filename, contents, {encoding: "utf8"});
    }

    /* Private Methods */
};
