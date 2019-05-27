# async-lodash
Extended from lodash to make it work with async/await.
This has all properties of lodash.
Collections/object utilities with async/await support.


# Usage In Nodejs

Async Methods supported

```js
_.asyncEach(array, asyncFn);
_.asyncReverseEach(array, asyncFn);
_.asyncParallelEach(array, asyncFn, size); //async function will be yielded paralelly in chunks of given size
_.asyncMap(array, asyncFn);
_.asyncRemove(array, asyncFn); //returns removed values as array
_.asyncFilter(array, asyncFn); //returns filtered values as array
_.asyncFilterOne(array, asyncFn); //returns filtered value
_.asyncSleep(timeinms);
```

Async Filter Array: 

```js
//just to make async
    arr = [16, 1, 2, 16, 32];
    filtered = await _.asyncFilter(arr, async (val) => {
        await _.asyncSleep(val * 10);
        return val % 16 === 0;
    })
    //filtered = [16,16,32]
```

Async Each: 
Executes the function for each value of array

```js
//just to make async
    arr = [16, 1, 2, 16, 32];
    await _.asyncEach(arr, async (val) => {
        await _.asyncSleep(10);
        console.log(val);
    })
    //16 1 2 16 32

    await _.asyncReverseEach(arr, async (val) => {
        await _.asyncSleep(10);
        console.log(val);
    })
    //32 16 2 1 16
```

Async Parallel Each: 
Yields the promise in chunks of size (_.asyncParallelEach(array, asyncFn, size)). Size will be defaulted to actual length of array 

```js
    await _.asyncParallelEach(array, async (val) => {
        await _.asyncSleep(100 * val);
        console.log("after 1000 ", val);
    }, 3)
```