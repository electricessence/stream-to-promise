/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */

import ReadableStream = NodeJS.ReadableStream;
import WritableStream = NodeJS.WritableStream;
import ReadWriteStream = NodeJS.ReadWriteStream;

const _DATA = 'data', _END = 'end', _ERROR = 'error', _CLOSE = 'close';
export module StreamEvents
{
	export const DATA = _DATA;
	export const END = _END;
	export const ERROR = _ERROR;
	export const CLOSE = _CLOSE;
}
Object.freeze(StreamEvents);

export interface Executor<T>
{
	(resolve:(value?:T | PromiseLike<T>) => void, reject:(reason?:any) => void):void;
}

export interface PromiseFactory {
	<T>(executor:Executor<T>):PromiseLike<T>;
}

export { ReadableStream, ReadWriteStream, WritableStream }
export type Stream = ReadableStream | ReadWriteStream| WritableStream;

export class StreamToPromise
{

	// Expose DI to allow consumer to chose their own promise lib.
	constructor(private _promiseFactory:PromiseFactory)
	{
	}


	toArray<T>(stream:ReadableStream):PromiseLike<T[]>
	{
		return this._promiseFactory<T[]>((resolve, reject)=>
		{
			// stream is already ended
			if(!stream.readable) return resolve([]);

			let result:T[] = [];

			stream.on(_DATA, onData);
			stream.on(_END, onEnd);
			stream.on(_ERROR, onEnd);
			stream.on(_CLOSE, onClose);

			function onData(doc:T):void
			{
				result.push(doc);
			}

			function onEnd(err:any):void
			{
				if(err) reject(err);
				else resolve(result);
				cleanup();
			}

			function onClose()
			{
				resolve(result);
				cleanup();
			}

			function cleanup()
			{
				result = null;
				stream.removeListener(_DATA, onData);
				stream.removeListener(_END, onEnd);
				stream.removeListener(_ERROR, onEnd);
				stream.removeListener(_CLOSE, onClose);
			}
		})
	}


	/**
	 * Converts a stream into a respective promise.
	 * Can take an array of streams and will execute them in sequence and resolve when complete or reject if any fail.
	 * @param {NodeJS.ReadableStream | NodeJS.ReadWriteStream} stream
	 * @returns {PromiseLike<T>}
	 */
	toPromise<T>(stream:ReadableStream|ReadWriteStream):PromiseLike<T>
	toPromise(stream:WritableStream):PromiseLike<void>
	toPromise(stream:Stream):PromiseLike<void>
	toPromise(streams:Stream[]):PromiseLike<void>
	toPromise(stream:any):PromiseLike<any>
	{
		const _ = this;
		if(stream instanceof Array)
		{
			return _._promiseFactory((resolve,reject)=>
			{
				const streams = <Stream[]>stream;

				let i = 0;
				function next()
				{
					if(i<streams.length)
						_.toPromise(streams[i++]).then(next, reject);
					else
						resolve();
				}

				next();
			});
		}
		if(stream.readable) return _.fromReadable(stream);
		if(stream.writable) return _.fromWritable(stream);
		return _._promiseFactory(resolve=>resolve());
	}

	private fromReadable<T>(stream:ReadableStream):PromiseLike<T[]>
	{
		const promise = this.toArray<T>(stream);

		// Ensure stream is in flowing mode
		if(stream.resume) stream.resume();

		return promise;
	}

	private fromWritable(stream:WritableStream):PromiseLike<void>
	{
		return this._promiseFactory<void>((resolve, reject)=>
		{
			stream.once('finish', resolve);
			stream.once('error', reject);
		})
	}

}

export default StreamToPromise;