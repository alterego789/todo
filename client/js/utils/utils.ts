import { TodoItem, UUID } from '@ubi-todo/shared';


// TODO: optimize this - maybe build cache map.. 
export const findItem = (id: UUID<TodoItem> | string, items: TodoItem[]): TodoItem | null => {
	for(let i=0; i<items.length; i++){
		const item = items[i];
		if(item.id === id){
			return item;
		}
		if(item.details?.items){
			const itemMaybe = findItem(id, item.details?.items);
			if(itemMaybe){
				return itemMaybe;
			}
		}
	}
	return null;
}

export const buildTree = (
	id: UUID<TodoItem> | string,
	items: TodoItem[], 
	path: TodoItem[] = []
): TodoItem[] => {
	const item = findItem(id, items);
	let parent = item;
	while(parent){
		path.push(parent);
		if(!parent.parentId){
			break;
		}
		parent = findItem(parent.parentId, items);
	}
	return path;
}

export const calculateItemCompletion = (item: TodoItem): [number, number] => {
	let total = 0;
	let completed = 0;
	item.details.items.forEach(it => {
		total++;
		if(it.completed){
			completed++;
		}
		const [subcompleted, subtotal] = calculateItemCompletion(it);
		total += subtotal;
		completed += subcompleted;
	});

	return [completed, total];
}