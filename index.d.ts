/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */
import { StreamToPromise, PromiseFactory } from "./StreamToPromise";
export declare function streamToPromise(PromiseFactory: PromiseFactory): StreamToPromise;
export declare function streamToPromise(PromiseFactory: PromiseConstructorLike | PromiseFactory, isConstructor?: boolean): StreamToPromise;
export * from "./StreamToPromise";
export default streamToPromise;
