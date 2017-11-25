/// <reference types="node" />
/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */
import ReadableStream = NodeJS.ReadableStream;
import WritableStream = NodeJS.WritableStream;
import ReadWriteStream = NodeJS.ReadWriteStream;
export declare module StreamEvents {
    const DATA = "data";
    const END = "end";
    const ERROR = "error";
    const CLOSE = "close";
}
export interface Executor<T> {
    (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void): void;
}
export interface PromiseFactory {
    <T>(executor: Executor<T>): PromiseLike<T>;
}
export { ReadableStream, ReadWriteStream, WritableStream };
export declare type Stream = ReadableStream | ReadWriteStream | WritableStream;
export declare class StreamToPromise {
    private _promiseFactory;
    constructor(_promiseFactory: PromiseFactory);
    toArray<T>(stream: ReadableStream): PromiseLike<T[]>;
    /**
     * Converts a stream into a respective promise.
     * Can take an array of streams and will execute them in sequence and resolve when complete or reject if any fail.
     * @param {NodeJS.ReadableStream | NodeJS.ReadWriteStream} stream
     * @returns {PromiseLike<T>}
     */
    toPromise<T>(stream: ReadableStream | ReadWriteStream): PromiseLike<T>;
    toPromise(stream: WritableStream): PromiseLike<void>;
    toPromise(stream: Stream): PromiseLike<void>;
    toPromise(streams: Stream[]): PromiseLike<void>;
    private fromReadable<T>(stream);
    private fromWritable(stream);
}
export default StreamToPromise;
