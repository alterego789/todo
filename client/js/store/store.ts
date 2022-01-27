import { UbiWebSocket } from '../lib/ubi-web-socket.js';

export const ws = new UbiWebSocket(`wss://${location.host}/ws/`);

