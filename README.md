node-ssi
========

[![Build Status][travis-image]][travis-url]

Server Side Includes for NodeJS

__Note:__ The current version of ssi does all IO synchronously. Further development plans include writing methods asynchronously and migrating current methods to conform to Node conventions for synchronous methods.

### Supported Instructions

```html
<!--#include virtual="" -->
<!--#include file="" -->
<!--#set var="" value="" -->
<!--#echo var="" -->

<!--#if expr="" -->
<!--#elif expr="" -->
<!--#else -->
<!--#endif -->
```

### Installation

Install latest version by [npm install](https://docs.npmjs.com/cli/install)

```bash
npm install -i --save git+https://github.com/allex/node-ssi.git
```

Or manually add specified version (eg: v0.0.1) to `dependencies` section of `package.json`

```json
...
"dependencies": {
  "node-ssi": "git+https://github.com/allex/node-ssi.git#v0.0.1"
}
...
```

### Usage

```js
var ssi = require("node-ssi");

var sourceDir = '/tmp/test';
var destDir = '/tmp/output';
var matcher = '/**/*.shtml';

var includes = new ssi(sourceDir, destDir, matcher);
includes.compile();
```

### Methods

#### parse(filename, contents)

_filename_ `String` path to the file

_contents_ `String` Contents of the file to be parsed

Method returns the parsed contents

#### compile()

Method parses all of the files found by the matcher in the input directory, and writes the files to the output directory with identical names and directory structure.

### License

MIT
BSD-2-Clause


[travis-url]: https://travis-ci.org/allex/node-ssi
[travis-image]: http://img.shields.io/travis/allex/node-ssi.svg
