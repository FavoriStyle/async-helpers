# Async Helpers

### This repository contains a few usable classes:
### Awaiter
Just a Promise but only with "external" `resolve` and `reject` methods. Constructor takes no arguments
```javascript
import { Awaiter } from 'async-helpers'

const awaiter = new Awaiter;
awaiter.then(v => console.log({v}));
setTimeout(awaiter.resolve.bind(awaiter), 5000, 'MyResolvedValue')
```
`Awaiter` is `Promise` child class and async/await syntax is also supported
```javascript
import { Awaiter } from 'async-helpers'

const awaiter = new Awaiter;
if(awaiter instanceof Awaiter && awaiter instanceof Promise) (async () => {
    console.log('You know what it mean. awaiter val:', await awaiter)
})();
setTimeout(awaiter.resolve.bind(awaiter), 5000, 'MyResolvedValue')
```

### Interval
Useful replacement for pure `setInterval`. Implements method `isWorking` that returns boolean value depending on timer is working or already stopped. Is `Awaiter` child class. `resolve` and `reject` methods also stops the timer. Arguments are similar to [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
```javascript
import { Interval } from 'async-helpers'

let i = 0;
const interval = new Interval(() => {
    console.log(`${++i}s. after...`)
}, 1000);
setTimeout(interval.resolve.bind(interval), 10000);
(async () => {
    console.log('You know what it mean. interval val:', await interval)
})()
```

### Interval.Async
Pure `setInterval` implementation can't deal with async function as well. I mean it may but not if there is need to wait for a result before next tick. This may be solved with recursive `setTimeout`, but big recursion may throw an callback stack overflow. This class allows to deal with it. Is `Interval` child class. Implements no new methods. Arguments are similar to `Interval` constructor
```javascript
import { Interval } from 'async-helpers'

function wait(time){
    return new Promise(r => setTimeout(r, time))
}

const interval = new Interval.Async(async () => {
    console.log('1s interval...');
    await wait(3000);
    console.log('and 3s async function')
}, 1000);
setTimeout(interval.resolve.bind(interval), 10000);
(async () => {
    console.log('You know what it mean. interval val:', await interval)
})()
```

## CDN [![](https://data.jsdelivr.com/v1/package/gh/FavoriStyle/async-helpers/badge)](https://www.jsdelivr.com/package/gh/FavoriStyle/async-helpers)
If you are in browser environment you may want to use CDN to load this helpers as like any other lib:
```javascript
import { Awaiter, Interval } from 'https://cdn.jsdelivr.net/gh/FavoriStyle/async-helpers/dist/main.mjs'
```
