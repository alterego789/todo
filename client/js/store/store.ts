import { UbiWebSocket } from '../lib/UbiWebSocket.js';

export const ws = new UbiWebSocket(`wss://${location.host}/`);

