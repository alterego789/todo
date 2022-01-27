import { User, ACTION_DELIMITER } from '@ubi-todo/shared';
import { UbiWebSocket } from '../lib/ubi-web-socket.js';
import { Channel, Mutation, MutationActions, MutationPayload, MutationReturns, Query, QueryActions, QueryPayload, QueryReturns } from '../cruft/channels.js';
import { todoItemActions } from '../cruft/todo-item/todo-item.store.js';
import { userActions } from '../cruft/user/user.store.js';

export const ws = new UbiWebSocket(`wss://${location.host}/`);

export const store = {
	state: {
		user: null,
		items: []
	},
	getUser: (): User | null => {
		return null;
	},
	query: <
		C extends Channel,
		T extends QueryActions<C>,
		Q extends Query<C, T>
	>(channel: C, type: T, ...payload: QueryPayload<C, Q>): Promise<QueryReturns<C, Q>> => new Promise((resolve, reject) => {
		ws.dispatch<QueryReturns<C>>({
			path: [channel, 'query', type].join(ACTION_DELIMITER),
			payload
		},
			(err: Error | null, response: QueryReturns<C>) => {
				err ? reject(err) : resolve(response);
			}
		);
	}),
	mutation: <
		C extends Channel,
		T extends MutationActions<C>,
		M extends Mutation<C, T>
	>(channel: C, type: T, ...payload: MutationPayload<C, M>): Promise<MutationReturns<C, M>> => new Promise((resolve, reject) => {

		// TODO: save if offline
		ws.dispatch<MutationReturns<C>>({
			path: [channel, 'mutation', type].join('/'),
			payload
		},
			(err: Error | null, response: MutationReturns<C>) => {


				err ? reject(err) : resolve(response);
			}
		);
	}),
};

export type AppState = typeof store.state;
export { userActions, todoItemActions };
