/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */
import ReadableStream = NodeJS.ReadableStream;
import WritableStream = NodeJS.WritableStream;
import ReadWriteStream = NodeJS.ReadWriteStream;
export declare module StreamEvents {
    const DATA: string;
    const END: string;
    const ERROR: string;
    const CLOSE: string;
}
export declare class StreamToPromise {
    private _Promise;
    constructor(_Promise: PromiseConstructorLike);
    toArray<T>(stream: ReadableStream): PromiseLike<T[]>;
    toPromise<T>(stream: ReadableStream | ReadWriteStream): PromiseLike<T>;
    toPromise(stream: WritableStream): PromiseLike<void>;
    private fromReadable<T>(stream);
    private fromWritable(stream);
}
export default StreamToPromise;
