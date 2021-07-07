'use strict';

const callbackify = fn => (...args) => {
	const callcack = args.pop();
	fn(...args)
		.then(value => {
			callcack(null, value);
		})
		.catch(reason => callbackify(reason));
};

const twicePromise = x => Promise.resolve(x * 2);
const halfPromise = x => Promise.resolve(x / 2);

const twiceCallback = callbackify(twicePromise);
const halfCallback = callbackify(halfPromise);

twicePromise(100)
	.then(value => halfPromise(value))
	.then(result => console.dir({ promisefield: result }));

twiceCallback(100, (e, data) => {
	halfCallback(data, (e, result) => {
		console.dir({ callback: result });
	});
});