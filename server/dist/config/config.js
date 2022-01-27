import fs from 'fs';
import path from 'path';
export const config = {
    root: path.normalize('../client/esbuild'),
    datapath: path.normalize('./data'),
    host: '0.0.0.0',
    port: 443,
    path: undefined,
    developement: true,
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
    // passphrase: 'test'
};
//# sourceMappingURL=config.js.map