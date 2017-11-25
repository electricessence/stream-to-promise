"use strict";
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _DATA = 'data', _END = 'end', _ERROR = 'error', _CLOSE = 'close';
var StreamEvents;
(function (StreamEvents) {
    StreamEvents.DATA = _DATA;
    StreamEvents.END = _END;
    StreamEvents.ERROR = _ERROR;
    StreamEvents.CLOSE = _CLOSE;
})(StreamEvents = exports.StreamEvents || (exports.StreamEvents = {}));
Object.freeze(StreamEvents);
var StreamToPromise = /** @class */ (function () {
    // Expose DI to allow consumer to chose their own promise lib.
    function StreamToPromise(_promiseFactory) {
        this._promiseFactory = _promiseFactory;
    }
    StreamToPromise.prototype.toArray = function (stream) {
        return this._promiseFactory(function (resolve, reject) {
            // stream is already ended
            if (!stream.readable)
                return resolve([]);
            var result = [];
            stream.on(_DATA, onData);
            stream.on(_END, onEnd);
            stream.on(_ERROR, onEnd);
            stream.on(_CLOSE, onClose);
            function onData(doc) {
                result.push(doc);
            }
            function onEnd(err) {
                if (err)
                    reject(err);
                else
                    resolve(result);
                cleanup();
            }
            function onClose() {
                resolve(result);
                cleanup();
            }
            function cleanup() {
                result = null;
                stream.removeListener(_DATA, onData);
                stream.removeListener(_END, onEnd);
                stream.removeListener(_ERROR, onEnd);
                stream.removeListener(_CLOSE, onClose);
            }
        });
    };
    StreamToPromise.prototype.toPromise = function (stream) {
        var _ = this;
        if (stream instanceof Array) {
            return _._promiseFactory(function (resolve, reject) {
                var streams = stream;
                var i = 0;
                function next() {
                    if (i < streams.length)
                        _.toPromise(streams[i++]).then(next, reject);
                    else
                        resolve();
                }
                next();
            });
        }
        if (stream.readable)
            return _.fromReadable(stream);
        if (stream.writable)
            return _.fromWritable(stream);
        return _._promiseFactory(function (resolve) { return resolve(); });
    };
    StreamToPromise.prototype.fromReadable = function (stream) {
        var promise = this.toArray(stream);
        // Ensure stream is in flowing mode
        if (stream.resume)
            stream.resume();
        return promise;
    };
    StreamToPromise.prototype.fromWritable = function (stream) {
        return this._promiseFactory(function (resolve, reject) {
            stream.once('finish', resolve);
            stream.once('error', reject);
        });
    };
    return StreamToPromise;
}());
exports.StreamToPromise = StreamToPromise;
exports.default = StreamToPromise;
//# sourceMappingURL=StreamToPromise.js.map