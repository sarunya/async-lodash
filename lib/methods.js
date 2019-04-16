async function asyncEach(obj, fn) {
    for(let val of obj) {
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

function _removeElementAtIndex(array, index) {
    array.splice(index, 1);
}

module.exports = {
    asyncEach,
    asyncFilter,
    asyncFilterOne,
    asyncMap,
    asyncRemove,
    asyncReverseEach
}