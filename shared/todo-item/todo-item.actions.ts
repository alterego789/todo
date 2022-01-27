import { Actions } from '../actions.js';
import { User, UUID } from '../index.js';
import { TodoItem } from './todo-item.model.js';


interface TodoItemQueries {
	getItems: (userId: UUID<User>) => Promise<TodoItem[]>
}
interface TodoItemMutations {
	addItem: (todoItem: TodoItem) => Promise<TodoItem>
	remvoeItem: (todoItem: UUID<TodoItem>) => Promise<UUID<TodoItem>>
}

export type TodoItemActions = Actions<TodoItemQueries, TodoItemMutations, {}>
