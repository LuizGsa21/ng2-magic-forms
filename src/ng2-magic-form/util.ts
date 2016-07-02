export function isPresent (obj: any): boolean {
    return obj !== undefined && obj !== null;
}

export function isBlank (obj: any): boolean {
    return obj === undefined || obj === null;
}

export function isBoolean (obj: any): boolean {
    return typeof obj === "boolean";
}

export function isNumber (obj: any): boolean {
    return typeof obj === "number";
}

export function isString (obj: any): boolean {
    return typeof obj === "string";
}

export function isFunction (obj: any): boolean {
    return typeof obj === "function";
}

export function isStringMap (obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
}
export function isObject (obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
}
export function isArray (obj: any): boolean {
    return Array.isArray(obj);
}
export function has(obj: any, key: string) {
    return obj != null && obj.hasOwnProperty(key);
}

export function isArrayLike(obj: any) {
    return has(obj, 'length');
}

export function  isArguments(obj) {
    return !!(obj && has(obj, 'callee'));
}
export function isEmpty (obj: any): boolean {
    if (obj == null) return true;
    if (isArrayLike(obj) && (isArray(obj) || isString(obj) || isArguments(obj))) {
        return obj.length === 0;
    }
    return Object.keys(obj).length === 0;
}

export function extractRecursive (obj, propName, seed = []) {
    for (var name in obj) if (obj.hasOwnProperty(name)) {
        if (name == propName) {
            seed.push(obj[propName]);
        } else if (isArray(obj[name])) {
            obj[name].forEach((obj) => extractRecursive(obj, propName, seed));
        } else if (isObject(obj[name])) {
            return extractRecursive(obj[name], propName, seed);
        }
    }
    return seed;
}
export function throwError (message) {
    throw Error(message);
}

export function debug (...args) {
    console.log.apply(console, args);
}

export function print(...args) {
    console.log.apply(console, args);
}

export function warn(...args) {
    console.warn.apply(console, args);
}