var rework = require('rework');
var reworkUrl = require('rework-plugin-url');
var through = require('through2');

module.exports = function (param) {
    param = param || {};
    const img = param.img || '/img/';
    const font = param.font || '/font/';
    const FONT = ["eot", "ttf", "woff", "woff2"];

    function fileExtension(file) {
        return file.slice((file.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();;
    }

    function isInArray(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (value.indexOf(arr[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    function replaceUrl(css) {
        return rework(css)
            .use(reworkUrl(function (url) {
                if (url.indexOf('data:') === 0) {
                    return url;
                } else if (/font/.test(url) && /svg/.test(fileExtension(url)) || isInArray(FONT, url)) {
                    return font + url.substring(url.lastIndexOf("/") + 1);
                } else {
                    return img + url.substring(url.lastIndexOf("/") + 1);
                }
            }))
            .toString();
    };

    return through.obj(function (file, enc, cb) {
        var css = replaceUrl(file.contents.toString());
        file.contents = new Buffer(css);

        this.push(file);
        cb();
    });
};