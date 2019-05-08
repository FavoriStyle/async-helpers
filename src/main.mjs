export const Awaiter = (() => {
    const storage = Symbol();
    const promiseMethods = Object.getOwnPropertyNames(Promise.prototype).filter(v => v !== 'constructor' && typeof Promise.prototype[v] === 'function');
    function Awaiter(){
        if(!new.target) throw new Error('Awaiter is a class so must be constructed with `new`');
        let resolve, reject;
        const promise = new Promise((_, $) => {resolve = _; reject = $});
        // Promises/A+, you know. resolve and reject is already assigned
        const store = { resolve, reject };
        promiseMethods.forEach(m => store[m] = promise[m].bind(promise));
        Object.defineProperty(this, storage, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: store,
        })
    }
    const protoMethods = {};
    ['resolve', 'reject', ...promiseMethods].forEach(m => protoMethods[m] = function(...args){ return this[storage][m](...args) });
    Awaiter.prototype = Object.assign(Object.create(Promise.prototype), protoMethods);
    return Awaiter
})();

const asyncFunctionIntervalIdentifier = Symbol();

export class Interval extends Awaiter{
    constructor(func, timeout = 0, ...args){
        super();
        const f = func[asyncFunctionIntervalIdentifier] || ((...args) => {func(...args)});
        this._handler = true;
        (async () => {
            while(this._handler){
                await wait(timeout);
                await f(...args)
            }
        })().catch(this.reject.bind(this))
    }
    isWorking(){
        return this._handler
    }
    _clear(){
        this._handler = false
    }
    resolve(){
        this._clear();
        return super.resolve()
    }
    reject(){
        this._clear();
        return super.reject()
    }
}

class AsyncInterval extends Interval{
    constructor(func, timeout = 0, ...args){
        super({[asyncFunctionIntervalIdentifier]: func}, timeout, ...args)
    }
}

Interval.Async = AsyncInterval
