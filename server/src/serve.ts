import { createServer } from 'https';
import { WebSocketServer, WebSocket } from 'ws';
import { config } from './config/config.js';
import { WSConnection } from './controllers/ws-connection.js';
import fs, { createReadStream } from 'fs';
import path from 'path';
import { getContentTypeFromExt } from './lib/mime.js';

const server = createServer(config, (req, resp) => {
	const errorResponse = () => {
		resp.writeHead(500, 'Internal server error');
		resp.end();
	}
	if (req.method?.toLowerCase() !== 'get') {
		errorResponse();
		return;
	}

	let buffer = Buffer.alloc(0);
	req.on('data', async (data) => {
		if (buffer.length + data.length > 1000) {
			errorResponse();
			return;
		}
		buffer = Buffer.concat([buffer, data]);
	});

	const filename: string = path.normalize(config.root + req.url);
	if (!filename.startsWith(config.root)) {
		errorResponse();
		return;
	}

	fs.stat(filename, (err, stats) => {
		const finalPath = (err || stats.isDirectory()) ? config.root + '/index.html' : filename;
		resp.setHeader('content-type', getContentTypeFromExt(filename, req.headers) as string);
		resp.writeHead(200, 'OK');
		const rs = createReadStream(finalPath);
		rs.pipe(resp);
	});

});

const wss = new WebSocketServer({
	server,
	backlog: 10
});


const watchers: WebSocket[] = [];
if (config.developement) {
	fs.watch(config.root, {
		recursive: true
	}, (event, filename) => {
		console.log('file changed!', event, filename);
		watchers.forEach(w => {
			w.send(
				JSON.stringify({
					type: event,
					payload: filename
				})
			);
		});
	});
}
wss.on('connection', (ws: WebSocket, request) => {
	new WSConnection(wss, ws, request);
	if (config.developement) {
		// TODO: add esbuild api directly
		watchers.push(ws);
		ws.on('close', () => {
			const index = watchers.indexOf(ws);
			watchers.splice(index, 1);
		});
	}
});

server.listen(config);