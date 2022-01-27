import { TodoItem, User, UUID } from '@ubi-todo/shared';
import { useEffect, useState } from 'react'
import { newUUID } from '../lib/uuid.js';
import { buildTree, findItem } from '../utils/utils.js';
import { ws } from './store.js';


// TODO: housekeeping.. split into multiple files
export const INIT_START = 1;
export const INIT_PROCESING = 2;
export const INIT_READY = 3;
export const INIT_OFFLINE = 4;

export type AppState = {
	items: TodoItem[],
	user: User,
	init: number
};

const defaultState: AppState = {
	init: INIT_START,
	items: [],
	user: {
		email: 'da guy',
		id: newUUID()
	}
}


const savedStateString = localStorage.getItem('state')
const savedState = savedStateString ? JSON.parse(savedStateString) : {};

let globalState: AppState = {
	...defaultState,
	...savedState,
	init: INIT_START
}

const setStates: React.Dispatch<React.SetStateAction<AppState>>[] = [];
const updateState = () => {
	const newState = { ...globalState };
	localStorage.setItem('state', JSON.stringify(globalState));
	setStates.forEach(ss => {
		ss(newState);
	});
}
const actions = {
	updateFullState: (newState: AppState) => {
		globalState = newState;
		updateState();
	},
	addItem: (item: TodoItem, parentId?: UUID<TodoItem> | string) => {
		const parent = parentId ? findItem(parentId, globalState.items) : null;
		let array = parent ? parent.details?.items : globalState.items;
		array.push(item);
		updateState();
		actions.updateItem(item);
	},
	toggleItemState: (id: UUID<TodoItem>) => () => {
		const item = findItem(id, globalState.items);
		if (item) {
			item.completed = !item.completed;
			updateState();
			actions.updateItem(item);
		}
	},
	removeItem: (id: UUID<TodoItem>) => () => {
		if (confirm('Are you sure?')) {
			const item = findItem(id, globalState.items);
			if (!item) {
				return;
			}

			const parent = item.parentId ? findItem(item.parentId, globalState.items) : null;
			const withItems = parent ? parent.details : globalState;
			withItems.items = withItems.items.filter(i => i.id !== id);
			updateState();
			// TODO: send to server
		}
	},

	updateItemDetails: (item: TodoItem) => (val: string) => {
		item.details.description = val;
		updateState();
		actions.updateItem(item);
	},
	// TODO: throttle
	updateItem: (item: TodoItem) => {
		const path = buildTree(item.id, globalState.items);
		const root = path.pop();
		ws.dispatch('item.update', root);
	},

	updateItemSilently: (item: TodoItem) => {
		const stored = findItem(item.id, globalState.items);
		if (stored) {
			Object.assign(stored, item);
		}
		else {
			globalState.items.push(item);
		}
		updateState();
	},
	loadDetails: (itemId: UUID<TodoItem> | string) => {
		if (globalState.init === INIT_START) {
			ws.dispatch('item.load', itemId);
			globalState.init = INIT_PROCESING;
			updateState();
		}
	}
}



const updateFromStorage = () => {
	// TODO: throttle
	console.log('storage event!');
	const savedStateString = localStorage.getItem('state')
	const savedState = savedStateString ? JSON.parse(savedStateString) : {};
	if (savedState) {
		actions.updateFullState(savedState);
	}
};



export type AppActions = typeof actions;
export const useGlobalState = (deps?: React.DependencyList): { gState: AppState, actions: AppActions } => {
	const [state, setState] = useState(globalState);
	useEffect(() => {
		setStates.push(setState);
		const updateOff = ws.on<TodoItem>('item.update', (item) => {
			globalState.init = INIT_READY;
			actions.updateItemSilently(item);
			updateState();
		});
		const offline = () => {
			console.log('offline');
			globalState.init = INIT_OFFLINE;
			updateState();
		}
		const online = () => {
			globalState.init = INIT_START;
			updateState();
		}

		ws.ws.addEventListener('close', offline);
		ws.ws.addEventListener('open', online);

		window.addEventListener('offline', offline);
		window.addEventListener('online', online);
		window.addEventListener('storage', updateFromStorage);
		return () => {
			window.removeEventListener('offline', offline);
			window.removeEventListener('online', online);
			ws.ws.removeEventListener('close', offline);
			ws.ws.removeEventListener('open', online);

			window.removeEventListener('storage', updateFromStorage);
			setStates.splice(setStates.indexOf(setState), 1);
			updateOff();
		}
	}, deps);

	return {
		gState: state,
		actions: actions
	};
}