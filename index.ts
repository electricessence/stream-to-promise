/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 * Converted to typescript from stream-to-array and stream-to-promise
 */

import {StreamToPromise} from "./StreamToPromise";
function streamToPromise(Promise:PromiseConstructorLike)
{
	return new StreamToPromise(Promise);
}
export = streamToPromise;