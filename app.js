// ! Asyncify

// const asyncify = fn => (...args) => {
// 	const callback = args.pop();
// 	setTimeout(() => {
// 		try {
// 			const result = fn(...args);
// 			if (result instanceof Error) {
// 				callback(result);
// 			} else {
// 				callback(null, result);
// 			}
// 		} catch (error) {
// 			callback(error);
// 		}
// 	}, 0);
// };

// const twice = x => x * 2;
// const half = x => x / 2;

// const twiceAsync = asyncify(twice);
// const halfAsync = asyncify(half);

// twiceAsync(100, (e, value) => {
// 	halfAsync(value, (e, result) => {
// 		console.dir({ asyncfield: result });
// 	});
// });

// const result = half(twice(100));
// console.dir({ sync: result });


// ! Promisify

// const promisify = fn => (...args) => new Promise(
// 	(res, rej) => {
// 		try {
// 			fn(...args, (err, data) => {
// 				if (err) rej(err);
// 				else res(data);
// 			});
// 		} catch (error) {
// 			rej(error);
// 		}
// 	});


// const twiceCallback = (x, callback) => {
// 	callback(null, x * 2);
// };
// const twicePromise = promisify(twiceCallback);

// const halfCallback = (x, callback) => {
// 	callback(null, x / 2);
// };
// const halfPromise = promisify(halfCallback);

// twicePromise(100)
// 	.then(value => halfPromise(value))
// 	.then(result => console.dir({ promisefield: result }));

// twiceCallback(100, (e, value) => {
// 	halfCallback(value, (e, result) => {
// 		console.dir({ callbackLast: result });
// 	});
// });

// ! PromisifySync

// const promisifySync = fn => (...args) => {
// 	try {
// 		const result = fn(...args)
// 		if (result instanceof Error) return Promise.reject(result);
// 		else return Promise.resolve(result);
// 	} catch (error) {
// 		Promise.reject(error);
// 	}
// };


// const twice = x => x * 2;
// const half = x => x / 2;

// const twicePromise = promisifySync(twice);
// const halfPromise = promisifySync(half);

// twicePromise(100)
// 	.then(value => halfPromise(value))
// 	.then(result => console.dir({ promise: result }));

// const result = twice(half(100));
// console.dir({ sync: result });


// ! Callbackify

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


// ! Экзумпляр Promise

const promiseToCallbackLast = promise => callback => {
	promise.then(value => callback(null, value))
		.catch(reason => callback(reason));
};

const promise = Promise.resolve('value');
const fnCallbackLast = promiseToCallbackLast(promise);

fnCallbackLast((e, result) => {
	console.dir({ callbackLast: result });
});