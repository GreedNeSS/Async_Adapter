'use strict';

const promisify = fn => (...args) => new Promise(
	(res, rej) => {
		try {
			fn(...args, (err, data) => {
				if (err) rej(err);
				else res(data);
			});
		} catch (error) {
			rej(error);
		}
	});


const twiceCallback = (x, callback) => {
	callback(null, x * 2);
};
const twicePromise = promisify(twiceCallback);

const halfCallback = (x, callback) => {
	callback(null, x / 2);
};
const halfPromise = promisify(halfCallback);

twicePromise(100)
	.then(value => halfPromise(value))
	.then(result => console.dir({ promisefield: result }));

twiceCallback(100, (e, value) => {
	halfCallback(value, (e, result) => {
		console.dir({ callbackLast: result });
	});
});