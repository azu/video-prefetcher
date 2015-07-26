// LICENSE : MIT
"use strict";
import assert  from "power-assert";
import path from "path";
import VideoPrefetcher from "../src/video-prefetcher";
function isSupportVideo() {
    var video = document.createElement("video");
    var playType = video.canPlayType('video/mp4; codecs="avc1.42E01E"');
    if (!playType) {
        return false;
    }
    return playType.length > 0;
}
var describe = isSupportVideo() ? window.describe : window.describe.skip;
describe("video-prefetcher", function () {

    var video;
    beforeEach(function () {
        video = document.createElement("video");
        document.body.appendChild(video);
    });
    afterEach(function () {
        document.body.removeChild(video);
    });
    it("video.src should blob://", function (done) {
        var fetcher = new VideoPrefetcher(video);
        fetcher.onError(done);
        fetcher.onLoad(function () {
            var blobURL = video.src;
            assert.ok(/^blob:/.test(blobURL));
            done();
        });
        fetcher.start();
    });
    it("should handle progress event", function (done) {
        var fetcher = new VideoPrefetcher(video);
        fetcher.onError(done);
        fetcher.onProgress(function (event) {
            var percentComplete = event.loaded / event.total;
            assert(0 <= percentComplete && percentComplete <= 1);
        });
        fetcher.onLoad(function () {
            done();
        });
        fetcher.start();
    });
});