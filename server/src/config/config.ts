import fs from 'fs';
import path from 'path';

export const config = {
	root: path.normalize('../client/esbuild'),
	datapath: path.normalize('./data'),
	host: 'localhost',
	port: 443,
	path: undefined,
	developement: true,
	key: fs.readFileSync('./cert/key.pem'),
	cert: fs.readFileSync('./cert/cert.pem'),
	// passphrase: 'test'
};
