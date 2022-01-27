import { WebSocketServer, WebSocket } from "ws";

export class BaseChannel {
	name = 'base';
	constructor(protected wss: WebSocketServer, protected ws: WebSocket){}

	send(data: Record<string, Object | unknown>){
		this.ws.send(JSON.stringify({
			channel: this.name,
			...data
		}));
	}
	sendAll(data: Record<string, Object>){
		this.wss.clients.forEach(ws => {
			ws.send(JSON.stringify({
				channel: this.name,
				...data
			}));
		})
	}
	sendOthers(data: Record<string, Object>){
		this.wss.clients.forEach(ws => {
			if(ws === this.ws){
				return;
			}
			ws.send(JSON.stringify({
				channel: this.name,
				...data
			}));
		})
	}
}