# async-lodash
collections/object utilities with async/await support


# Usage In Nodejs

Async Methods supported

```js
await _.asyncEach(array, asyncFn);
await _.asyncMap(array, asyncFn);
let removed = await _.asyncRemove(array, asyncFn);
let filtered = await _.asyncFilter(removed, asyncFn);
filtered = await _.asyncFilterOne(removed, asyncFn);
```

Async Filter Array: 

```js
//just to make async
async function asyncFn(i, callback) {
    return new Promise((resolve, reject)=> {
        setTimeout((i)=> {
            let val = callback(i);
            resolve(val);
        }, i*100, i);
    })
}

async function filter(i) {
    return asyncFn(i, ()=> {
        return i%16===0;
    })
}

var arr=[16,1,2,16,32];
let filtered = await _.asyncFilter(arr, filter)
    //filtered = [16,16,32]
```
