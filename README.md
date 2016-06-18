stream-to-promise-agnostic
==========================
(Built using TypeScript. Type declarations are embedded.)

Convert streams (readable or writable) to promises using your own standard Promise library.

### Usage

#### Step 1: Import

```ts
import Promise from 'bluebird; // Or any promise like library of your choice.  
import streamToPromise from 'stream-to-promise-agnostic';
const convert = streamToPromise(Promise);
```

```streamToPromise``` takes any ```PromiseConstructorLike``` (see lib.d.ts) constructor.

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

