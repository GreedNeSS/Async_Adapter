'use strict';

const asyncify = fn => (...args) => {
	const callback = args.pop();
	setTimeout(() => {
		try {
			const result = fn(...args);
			if (result instanceof Error) {
				callback(result);
			} else {
				callback(null, result);
			}
		} catch (error) {
			callback(error);
		}
	}, 0);
};

const twice = x => x * 2;
const half = x => x / 2;

const twiceAsync = asyncify(twice);
const halfAsync = asyncify(half);

twiceAsync(100, (e, value) => {
	halfAsync(value, (e, result) => {
		console.dir({ asyncfield: result });
	});
});

const result = half(twice(100));
console.dir({ sync: result });