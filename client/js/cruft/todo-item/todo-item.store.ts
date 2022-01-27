import { TodoItemActions } from '@ubi-todo/shared';
import { store } from '../store.js';

export const todoItemActions: TodoItemActions = {
	query: {
		getItems: (ownerId) => store.query('items', 'getItems', ownerId)
	},
	mutation: {
		addItem: (item) => store.mutation('items', 'addItem', item),
		remvoeItem: (itemId) => store.mutation('items', 'remvoeItem', itemId),
	},
	event: {}
}