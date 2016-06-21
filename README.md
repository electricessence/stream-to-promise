stream-to-promise-agnostic
==========================
(Built using TypeScript. Type declarations are embedded.)

Convert streams (readable or writable) to promises using your own standard Promise library.

### Usage

#### Step 1: Import

##### Using an ES6 style compatible Promise library 
```ts
import Promise from 'bluebird; // Or any constructor compatible promise like library of your choice.  
import streamToPromise from 'stream-to-promise-agnostic';

const convert = streamToPromise(Promise,true); // 'true' indicates a Promise constructor
```
```streamToPromise``` can take any ```PromiseConstructorLike``` (see lib.d.ts) constructor when the second param equals ```true```

##### Using a Promise library that doesn't have a constructor (Example: Q)
```ts 
import {streamToPromise,PromiseFactory,Executor} from 'stream-to-promise-agnostic';
const QPromiseFactory:PromiseFactory = <T>(e:Executor<T>)=>require("q").promise(e);

const convert = streamToPromise(QPromiseFactory);
``` 



#### Step 2: Consume

###### Readable
```ts
convert.toPromise(readableStream).then(array=> {
  // array.length === 3
});
readableStream.emit('data', 1);
readableStream.emit('data', 2);
readableStream.emit('data', 3);
readableStream.emit('end'); // promise is resolved here
```

###### Writable
```ts
convert.toPromise(writableStream).then(()=> {
  // resolves undefined
});
writableStream.write('data');
writableStream.end(); // promise is resolved here
```

