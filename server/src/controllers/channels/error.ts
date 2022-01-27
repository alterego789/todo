import { BaseChannel } from "./base-channel.js";

export class Error extends BaseChannel {
	/**
	 * @param {{ channel: string; type: string; payload: any; }} payload
	 */
	a_unknownAction(payload: unknown){
		this.send({error: 'Unknown action', payload})
	}
}