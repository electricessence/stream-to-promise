/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */



import {StreamToPromise, PromiseFactory,Executor} from "./StreamToPromise";

export function streamToPromise(PromiseFactory:PromiseFactory):StreamToPromise
export function streamToPromise(PromiseFactory:PromiseConstructorLike|PromiseFactory,isConstructor?:boolean):StreamToPromise
export function streamToPromise(PromiseFactory:any,isConstructor?:boolean):StreamToPromise
{
	if(isConstructor) PromiseFactory = <T>(executor:Executor<T>)=> new PromiseFactory(executor);
	return new StreamToPromise(PromiseFactory);
}

export default streamToPromise;