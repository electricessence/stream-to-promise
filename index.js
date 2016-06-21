/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var StreamToPromise_1 = require("./StreamToPromise");
function streamToPromise(PromiseFactory, isConstructor) {
    if (isConstructor)
        PromiseFactory = function (executor) { return new PromiseFactory(executor); };
    return new StreamToPromise_1.StreamToPromise(PromiseFactory);
}
exports.streamToPromise = streamToPromise;
__export(require("./StreamToPromise"));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = streamToPromise;
//# sourceMappingURL=index.js.map