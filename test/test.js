var gutil = require('gulp-util');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');

var cssUrlReplace = require('../index');

var read = function(name) {
  return fs.readFileSync(path.join(__dirname, name));
};

var testContents = read('test.css');

test('prefix', function(t) {
  var stream = cssUrlReplace({
    img: '/assets/img/',
    font: '/assets/font/'
  });

  stream.write(new gutil.File({
    contents: read('test.css')
  }));

  stream.once('data', function(file) {
    t.equal(file.contents.toString('utf8').trim(),
            read('expected.css').toString().trim());
  });

  stream.end();

  t.end();

});

