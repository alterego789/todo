const fs = require('fs');

// this allows to import js files as ts files.. 
// basically to avoid one more tsc process in shared folder (to generate proper js files)
module.exports = {
	ImportFallback: class ImportFallback {
		// @ts-ignore
		apply(resolver) {
			const target = resolver.ensureHook('resolve');
			// @ts-ignore
			resolver.getHook('before-resolve').tapAsync('ResolveFallback', (request, resolveContext, callback) => {
				if (fs.existsSync(request.request)) {
					callback();
					return;
				}

				const parts = request.request.split('.');
				const ext = parts.pop();
				if (ext !== 'js') {
					callback();
					return;
				}
				const obj = {
					directory: request.directory,
					path: request.path,
					query: request.query,
					request: parts.join('.'),
				};
				resolver.doResolve(target, obj, null, resolveContext, callback);
			});
		}
	}
}
