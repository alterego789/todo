import { UUID } from "../index.js";

export interface TodoItem {
	id: UUID<TodoItem>;
	parentId: UUID<TodoItem> | null;
	title: string;
	completed: boolean;
	locked: boolean;
	details: TodoItemDetails;
}

export interface TodoItemDetails<T extends WorkTaskFields | FoodTaskFields | null = null> {
	type: T;
	description: string;
	price: number;
	items: TodoItem[];
	additionalFields: T;
}

export interface WorkTaskFields {
	deadline: Date; // TODO: consider DateTime (Luxon?)
}

export interface FoodTaskFields {
	carbs: number;
	fats: number;
	protein: number;
	picture: Blob | null;
}
