const _ = require('../index');


async function asyncFn(i, callback) {
    return new Promise((resolve, reject) => {
        setTimeout((i) => {
            let val = callback(i);
            resolve(val);
        }, i * 100, i);
    })
}

async function filterer(i) {
    return asyncFn(i, () => {
        console.log(i);
    })
}

async function mapper(i) {
    return asyncFn(i, () => {
        return i * i;
    })
}


async function remover(i) {
    return asyncFn(i, () => {
        return i % 2 === 0;
    })
}

async function filter(i) {
    return asyncFn(i, () => {
        return i % 16 === 0;
    })
}



async function filterValue() {
    let array = [1, 2, 3, 4, 5, 4, 4, 4];
    await _.asyncEach(array, filterer);
    console.log(array);
    await _.asyncMap(array, mapper);
    console.log(array);
    let removed = await _.asyncRemove(array, remover);
    console.log(array, removed);
    let filtered = await _.asyncFilter(removed, filter)
    console.log(filtered, array, removed);
    filtered = await _.asyncFilterOne(removed, filter)
    console.log(filtered, array, removed);
    await _.asyncReverseEach(array, filterer);

    await _.asyncParallelEach(array, async (val) => {
        await _.asyncSleep(100 * val);
        console.log("after 1000 ", val);
    }, 3)

    await _.asyncEach(arr, async (val) => {
        await _.asyncSleep(10);
        console.log(val);
    })

    arr = [16, 1, 2, 16, 32];
    filtered = await _.asyncFilter(arr, async (val) => {
        await _.asyncSleep(val * 10);
        return val % 16 === 0;
    })
    console.log(filtered);
}

filterValue().then(() => {
    console.log("done");
})