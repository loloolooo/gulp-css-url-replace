# gulp-css-url-replace

## Installation

```bash
npm install --save-dev gulp-css-url-replace

```

## Example

```javascript
var cssUrlReplace = require('gulp-css-url-replace');

//...
.pipe(cssUrlReplace('/assets/img/'))
//...
```

```css
.sample { background-image: url('../../img/sample.jpg'); }
.sample { background-image: url('/img/sample.jpg'); }
.sample { background-image: url(https://abc.xyz/assets/sample.jpg); }

/* /assets/img/ */

.sample { background-image: url('/assets/img/sample.jpg'); }
.sample { background-image: url('/assets/img/sample.jpg'); }
.sample { background-image: url(/assets/img/sample.jpg); }
```

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests to cover it.

## License

MIT © [Nicholas Hsiang](https://xinlu.ink)