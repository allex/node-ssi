// Inspired by https://raw.githubusercontent.com/XadillaX/node-crlf2lf/master/lib/crlf2lf.js

var fs = require('fs');

function _isBinary(buf) {
    for(var i = -1, l = buf.length; ++i < l; ) {
        if(buf[i] <= 8) return true;
    }
    return false;
}

function convert(buf) {
    if (typeof buf === 'string') {
        buf = new Buffer(buf);
    }
    if(_isBinary(buf)) return buf;
    var res = new Buffer(buf.length);
    var resLen = 0;
    for (var i = -1, l = buf.length; ++i < l; ) {
        if(buf[i] === 13) {
            if(i < l - 1 && buf[i + 1] === 10) {
                continue;
            }
            if(i > 0 && buf[i - 1] === 10) {
                continue;
            }
        }
        res[resLen++] = buf[i];
    }

    return res.slice(0, resLen);
}

function processFile(filename) {
    try {
        var buf = fs.readFileSync(filename);
        buf = convert(buf);
        fs.writeFileSync(filename, buf);
    } catch(e) {
        console.error("failed to process", filename + ":", e.message);
    }
}

// Exports
exports.convert = convert;
exports.processFile = processFile;
