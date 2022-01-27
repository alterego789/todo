import { WSEventType } from './event-types.js';

export interface DispatchOptions {
	type: WSEventType;
	payload?: unknown;
}
