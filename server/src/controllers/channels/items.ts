import { BaseChannel } from "./base-channel.js";
import { TodoItem, TodoItemActions, User, UUID } from '@ubi-todo/shared';

type ITodoItemQueries = TodoItemActions['query'];
export class TodoItemQueries implements ITodoItemQueries {
	getItems: (userId: UUID<User>) => Promise<TodoItem[]> = async (id) => {
		return [];
	};
}
type ITodoItemMutations = TodoItemActions['mutation'];
export class TodoItemMutations implements ITodoItemMutations {
	addItem: (todoItem: TodoItem) => Promise<TodoItem> = async (todoItem) => {
		return todoItem;
	};
	remvoeItem: (todoItem: UUID<TodoItem>) => Promise<UUID<TodoItem>> = async (itemId) => {
		return itemId;
	};
}

export class Items extends BaseChannel implements TodoItemActions {
	query: TodoItemQueries;
	mutation: TodoItemMutations;
	event: {};
	name = 'items';
}