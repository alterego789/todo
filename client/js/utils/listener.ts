import { TodoItemActions } from '@ubi-todo/shared';

export type ActionType = keyof TodoItemActions;

export type UbiMessage<T extends ActionType> = {
	type: T;
	payload: TodoItemActions[T]
}

export const createListener = <T extends ActionType>(type: T, callback: (payload: TodoItemActions[T]) => void) => {
	const listener = (event: MessageEvent<{ type: typeof type, payload: TodoItemActions[typeof type] }>) => {
		console.log('window message', event.data);
		if (event.data.type !== type) {
			return;
		}
		callback(event.data.payload);
	}
	return {
		on: () => window.addEventListener('message', listener),
		off: () => window.removeEventListener('message', listener)
	}
}