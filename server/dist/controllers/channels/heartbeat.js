import { BaseChannel } from "./base-channel.js";
export class HeartBeat extends BaseChannel {
    interval;
    a_init() {
        console.log('heartbeat initialized!');
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.send({ ping: Date.now() });
        }, 1000);
        this.ws.on('close', () => {
            console.log('heartbeat stopped!');
            clearInterval(this.interval);
        });
    }
}
//# sourceMappingURL=heartbeat.js.map