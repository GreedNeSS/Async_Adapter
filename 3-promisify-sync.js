'use strict';

const promisifySync = fn => (...args) => {
	try {
		const result = fn(...args)
		if (result instanceof Error) return Promise.reject(result);
		else return Promise.resolve(result);
	} catch (error) {
		Promise.reject(error);
	}
};


const twice = x => x * 2;
const half = x => x / 2;

const twicePromise = promisifySync(twice);
const halfPromise = promisifySync(half);

twicePromise(100)
	.then(value => halfPromise(value))
	.then(result => console.dir({ promise: result }));

const result = twice(half(100));
console.dir({ sync: result });