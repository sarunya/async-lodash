/**
 * Iterates each value in object and performs the function provided
 * @param {Object} obj 
 * @param {*} fn 
 */
async function asyncEach(obj, fn) {
    for(let iKey in obj) {
        let val = obj[iKey];
        await fn(val);
    }
}

async function asyncReverseEach(obj, fn) {
    for(let index = obj.length-1; index>=0; index--) {
        let val = obj[index];
        await fn(val);
    }
}

async function asyncFilter(obj, fn) {
    let filtered = [];
    for(let val of obj) {
        let result = await fn(val);
        if(result == true) {
            filtered.push(val);
        }
    }
    return filtered;
}

async function asyncFilterOne(obj, fn) {
    let filtered = [];
    for(let val of obj) {
        let result = await fn(val);
        if(result == true) {
            return val;
        }
    }
}

async function asyncRemove(obj, fn) {
    let removed = [];
    let filtered = [];
    let index = 0;
    while(index < obj.length) {
        let val = obj[index];
        let result = await fn(val);
        if(result == true) {
            removed.push(val);
            _removeElementAtIndex(obj, index);
        } else {
            ++index;
        }
    }
    return removed;
}

async function asyncMap(obj, fn) {
    for(let iKey in obj) {
        obj[iKey] = await fn(obj[iKey]);
    }
}

/**
 * Iterates each value in object and performs the function provided
 * Yields the promises paralelly with size passed
 * size will be equal the obj length, if now passed
 * @param {Object} obj 
 * @param {*} fn 
 */
async function asyncParallelEach(obj, fn, size) {
    let parallel = [];
    size = size || -1;
    for(let iKey in obj) {
        let val = obj[iKey];
        parallel.push(fn(val));
        if(parallel.length === size) {
            await Promise.all(parallel);
        }
    }
    await Promise.all(parallel);
}

async function asyncSleep(i) {
    return new Promise((resolve, reject)=> {
        setTimeout((i)=> {
            resolve();
        }, i, i);
    })
}

function _removeElementAtIndex(array, index) {
    array.splice(index, 1);
}

module.exports = {
    asyncEach,
    asyncFilter,
    asyncFilterOne,
    asyncMap,
    asyncRemove,
    asyncReverseEach,
    asyncParallelEach,
    asyncSleep
}