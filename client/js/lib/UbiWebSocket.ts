import { WSEventType } from '@ubi-todo/shared';
export class UbiWebSocket {
	public ws: WebSocket;

	private pendingRequests: [
		type: WSEventType,
		payload: any
	][] = [];


	constructor(url: string) {
		this.initWs(url);
	}

	public on<T>(type: WSEventType, callback: (e: T) => void) {
		const wrapper = (e: MessageEvent<string>) => {
			const data: { type: WSEventType, payload: T } = JSON.parse(e.data);
			if (data.type === type) {
				callback(data.payload);
			}
		}
		this.ws.addEventListener('message', wrapper);
		return () => {
			this.ws.removeEventListener('message', wrapper);
		}
	}

	public dispatch<T>(type: WSEventType, payload: T): void {
		if (this.ws.readyState !== this.ws.OPEN) {
			// TODO: make UUID mandatory for all requests (most likely all requests has unique id)
			const key = type + (payload as unknown as {id: string}).id;

			const found = this.pendingRequests.find((r) => {
				if(r[1]?.id){
					return;
				}
				const rkey = r[0] + r[1]?.id;
				return key === rkey
			});
			if(found){
				this.pendingRequests.splice(this.pendingRequests.indexOf(found), 1);
			}
			
			this.pendingRequests.push([type, payload]);
			this.watchForConnection();
			return;
		}
		this.ws.send(JSON.stringify({
			type,
			payload
		}));
	}

	private initWs(url: string){
		this.ws = new WebSocket(url);
		this.ws.addEventListener('open', (event) => {
			console.log('ws open', event);
			this.watchForConnection();
		});
		
		this.ws.addEventListener('close', (event) => {
			console.log('ws close', event);
			this.initWs(url);
		});
		this.ws.addEventListener('message', (event) => {
			console.log('ws message', event.data);
		});
	}

	private watchForConnection = () => {
		if (this.ws.readyState === this.ws.OPEN) {
			while (this.pendingRequests.length) {
				const req = this.pendingRequests.pop();
				if (req) {
					this.dispatch(...req);
				}
			}
		}
		else {
			console.log('waiting for connection');
			setTimeout(this.watchForConnection, 5000);
		}
	}


}