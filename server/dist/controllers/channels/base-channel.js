export class BaseChannel {
    wss;
    ws;
    name = 'base';
    constructor(wss, ws) {
        this.wss = wss;
        this.ws = ws;
    }
    send(data) {
        this.ws.send(JSON.stringify({
            channel: this.name,
            ...data
        }));
    }
    sendAll(data) {
        this.wss.clients.forEach(ws => {
            ws.send(JSON.stringify({
                channel: this.name,
                ...data
            }));
        });
    }
    sendOthers(data) {
        this.wss.clients.forEach(ws => {
            if (ws === this.ws) {
                return;
            }
            ws.send(JSON.stringify({
                channel: this.name,
                ...data
            }));
        });
    }
}
//# sourceMappingURL=base-channel.js.map