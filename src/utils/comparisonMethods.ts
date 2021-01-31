
export function deepEqual<T>(object1?: T, object2?: T) {

    if(!object1 || !object2) return false;

    const keys1: string[] = Object.keys(object1);
    const keys2: string[] = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        // @ts-ignore
        const val1 = object1[key];
        // @ts-ignore
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            (areObjects && !deepEqual(val1, val2)) ||
            (!areObjects && val1 !== val2)
        ) {
            return false;
        }
    }

    return true;
}

function isObject(object?: Object) {
    return object != null && typeof object === 'object';
}