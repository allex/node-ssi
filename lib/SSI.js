"use strict";

var fs = require("fs");
var glob = require("glob");

var IOUtils = require("./IOUtils");
var DirectiveHandler = require("./DirectiveHandler");
var crlf2lf = require('./crlf2lf').convert;

var DIRECTIVE_MATCHER = /<!--\s*#([a-z]+)(\s+([a-z]+)="(.+?)")*\s*-->/g;

var ssi = function(inputDirectory, outputDirectory, matcher) {
    this.inputDirectory = inputDirectory;
    this.documentRoot = inputDirectory;
    this.outputDirectory = outputDirectory;
    this.matcher = matcher;

    this.ioUtils = new IOUtils(this.documentRoot);
    this.directiveHandler = new DirectiveHandler(this.ioUtils);
    this.directiveHandler.parser = this;
};

ssi.prototype = {
    compile: function() {
        var files = glob.sync(this.inputDirectory + this.matcher);
        for (var i = -1, l = files.length; ++i < l; ) {
            var input = files[i];
            var contents = fs.readFileSync(input, {encoding: "utf8"});
            var data = this.parse(input, contents);
            var output = input.replace(this.inputDirectory, this.outputDirectory);
            this.ioUtils.writeFileSync(output, crlf2lf(data.contents));
        }
    },

    parse: function(filename, contents, variables) {
        var instance = this;
        variables = variables || {};

        contents = contents.replace(new RegExp(DIRECTIVE_MATCHER), function(directive, directiveName) {
            var data = instance.directiveHandler.handleDirective(directive, directiveName, filename, variables);

            if (data.error) {
                throw new Error(data.error);
            }

            for (var key in data.variables) {
                if (data.variables.hasOwnProperty(key)) {
                    variables[data.variables[key].name] = data.variables[key].value;
                }
            }

            return (data && data.output) || "";
        });

        return {contents: contents, variables: variables};
    }
};

module.exports = ssi;
