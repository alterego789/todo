declare module 'model/todo-list' {
	type ItemType = 'work-task' | 'food';
	interface ListItem {
		id: string,
		ownerId: string,
		title: string,
		description: string,
		completed: boolean,
		locked: boolean,
		path: string,
		order: number,
		price: number,
		type: ItemType,
	}
}