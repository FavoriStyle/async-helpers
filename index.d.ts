interface Awaiter extends Promise<any>{
    readonly resolve(value?: any): void
    readonly reject(reason?: any): void
}

export const Awaiter: {
    new(): Awaiter
    prorotype: Awaiter
}

interface Interval extends Awaiter{
    readonly isWorking(): boolean
}

interface AsyncInterval extends Interval{ }

type FunctionArgs<F> = F extends (...args: infer T) => infer R ? T : never

type IntervalConstructor = {
    new<F extends (...args: infer T) => infer R>(func: F, timeout = 0, ...args: FunctionArgs<F>): Interval
    prorotype: Interval
    Async: AsyncIntervalConstructor
}

type AsyncIntervalConstructor = {
    new<F extends (...args: infer T) => Promise<infer R>>(func: F, timeout = 0, ...args: FunctionArgs<F>): AsyncInterval
    prorotype: AsyncInterval
}

export const Interval: IntervalConstructor
