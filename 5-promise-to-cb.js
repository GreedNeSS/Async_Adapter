'use strict';

const promiseToCallbackLast = promise => callback => {
	promise.then(value => callback(null, value))
		.catch(reason => callback(reason));
};

const promise = Promise.resolve('value');
const fnCallbackLast = promiseToCallbackLast(promise);

fnCallbackLast((e, result) => {
	console.dir({ callbackLast: result });
});