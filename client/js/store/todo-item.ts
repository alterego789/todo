import { TodoItem, UUID } from '@ubi-todo/shared';
import { newUUID } from '../lib/uuid.js';

export const makeTodoItem = (title: string, parentId: UUID<TodoItem> | string | null): TodoItem => {
	return ({
		id: newUUID(),
		parentId: parentId as UUID<TodoItem>,
		title,
		completed: false,
		locked: false,
		details: {
			additionalFields: null,
			items: [],
			description: '',
			price: 0,
			type: null
		}
	});
};