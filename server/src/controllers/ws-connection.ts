import { DispatchOptions, TodoItem, WSEventType } from '@ubi-todo/shared';
import fs, { createWriteStream } from 'fs';
import { IncomingMessage } from "http";
import path from 'path';
import { createWebSocketStream, WebSocket } from "ws";
import { config } from '../config/config.js';

// TODO: cleanup
const cache: Record<string, TodoItem> = {};

const rooms: Record<string, WebSocket[]> = {};

export class WSConnection {

	room: WebSocket[];
	constructor(private ws: WebSocket, private request: IncomingMessage) {
		// TODO: front-end for upload not implemented.. also some temporary token e.g. /uplad/token is required
		if (request.url?.startsWith('/upload/')) {
			this.handleUpload();
		}
		else {
			ws.on('message', this.handleMessage);
		}
	}

	handleMessage = (message: string | Buffer) => {
		const { type, payload } = this.parseMessage(message);
		this.executeAction(type, payload);
	}

	/**
	 * @param { string | Buffer } message
	 */
	parseMessage(message: string | Buffer): DispatchOptions {
		try {
			return JSON.parse(message.toString('utf8'));
		}
		catch (e) {
			return {
				type: 'Error.badMessage',
				payload: message?.toString('utf8')
			}
		}
	}

	// TODO: map action type with payload
	// TODO: handle FS errors
	// TODO: use normal DB and split items - and re-build tree
	async executeAction(type: WSEventType, payload: unknown) {
		switch (type) {
			case 'item.load': {
				const id = payload as string;
				this.leaveAllRooms();
				this.joinRoom(id);

				if(cache[id]){
					this.send('item.update', cache[id]);
				}
				const filename = path.join(config.datapath, id.toString());
				fs.readFile(filename, {encoding: 'utf-8'}, (err, data) => {
					if(err){
						this.send('item.update', null);
						return;
					}
					const item = JSON.parse(data);
					cache[id] = item;
					this.send('item.update', cache[id]);
				});
				return;
			}
			// todo throttle
			case 'item.update': {
				const item: TodoItem = payload as TodoItem;
				if(!item || !item.id){
					return;
				}
				const id = item.id.toString();
				cache[item.id.toString()] = item;
				this.leaveAllRooms();
				this.joinRoom(item.id.toString());

				const filename = path.join(config.datapath, item.id.toString());
				fs.writeFile(filename, JSON.stringify(payload), () => {
					console.log('saved!');
					this.sendRoom('item.update', cache[id]);
				});
				return;
			}
		}
	}

	handleUpload() {
		const filename = this.request.url?.split('/').pop() ?? 'junk';
		const stream = createWebSocketStream(this.ws);
		const junk = createWriteStream(`./data/${filename}`, {
			encoding: 'utf8'
		});

		stream.pipe(junk);
		stream.on('end', () => {
			console.log('stream completed!');
		});
		stream.on('data', (d) => {
			console.log('data', d);
		});
		// fs.createReadStream('./test.txt').pipe(stream);
	}

	joinRoom(id: string) {
		rooms[id] = rooms[id] ?? [];
		rooms[id].push(this.ws);
		this.room = rooms[id];
	}

	leaveRoom(id: string) {
		if (!rooms[id]) {
			return;
		}
		const room = rooms[id];
		const index = room.indexOf(this.ws);
		if (index === -1) {
			return;
		}

		room.splice(index, 1);
		this.room = [];
	}

	leaveAllRooms() {
		Object.keys(rooms).forEach(id => {
			this.leaveRoom(id);
		})
	}

	send(type: WSEventType, payload: unknown){
		this.ws.send(JSON.stringify({
			type,
			payload
		}));
	}
	sendRoom(type: WSEventType, payload: unknown){
		const msg = JSON.stringify({
			type,
			payload
		});
		this.room.forEach(ws => {
			ws.send(msg);
		})
	}
}