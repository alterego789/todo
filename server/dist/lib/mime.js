export const getContentTypeFromExt = (filename, headers) => {
    switch (filename.split('.').pop()?.toLowerCase()) {
        case 'js': return 'text/javascript; charset=utf-8';
        case 'png': return 'image/png';
        case 'html': return 'text/html; charset=utf-8';
        case 'css': return 'text/css; charset=utf-8';
        case 'json': return 'application/json; charset=utf-8';
        case 'webmanifest': return 'application/manifest+json; charset=utf-8';
    }
    return headers?.accept ? headers.accept.split(',').shift() : 'text/plain';
};
//# sourceMappingURL=mime.js.map