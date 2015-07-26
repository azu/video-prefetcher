# video-prefetcher [![Build Status](https://travis-ci.org/azu/video-prefetcher.svg?branch=master)](https://travis-ci.org/azu/video-prefetcher)

HTML5 video prefetch library.

## Installation

    npm install video-prefetcher

### Dependency

- [Blob object](https://developer.mozilla.org/en-US/docs/Web/API/Blob "Blob")

## Usage

```html
<video width="400" src="Google_Developer_Stories.webm" id="video">
</video>
```

```js
var VideoPrefetcher = require("video-prefetcher");
// <video> has `src` attribute
var video = document.getElementById("video");
var prefetcher = new VideoPrefetcher(video);
prefetcher.onProgress(function (event) {
    var percentComplete = event.loaded / event.total;
    console.log((percentComplete * 100) + "%");
});
prefetcher.onLoad(function (event) {
    // automatically, replace <video> src to fetched blob url.
    console.log("loaded", event);
});
prefetcher.onError(function (error) {
    console.error(error, error.stack);
});
prefetcher.start();
```

## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
