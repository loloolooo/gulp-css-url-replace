const rework = require('rework');
const reworkUrl = require('rework-plugin-url');
const through = require('through2');

module.exports = function (param) {
    param = param || {};
    const img = param.img || '/assets/img/';
    const font = param.font || '/assets/font/';
    const FONT = ["eot", "ttf", "woff", "woff2"];

    function fileExtension(file) {
        return file.slice((file.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();;
    }

    function isInArray(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            if (value.indexOf(arr[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    function replaceUrl(css) {
        let prefix = "";
        return rework(css)
            .use(reworkUrl(function (url) {
                if (url.indexOf('data:') === 0) {
                    return url;
                } else if (/font/.test(url) && /svg/.test(fileExtension(url)) || isInArray(FONT, fileExtension(url))) {
                    prefix = font;
                } else {
                    prefix = img;
                }
                return prefix + url.substring(url.lastIndexOf("/") + 1);
            }))
            .toString();
    };

    return through.obj(function (file, enc, cb) {
        let css = replaceUrl(file.contents.toString());
        file.contents = new Buffer(css);

        this.push(file);
        cb();
    });
};