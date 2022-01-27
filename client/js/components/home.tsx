import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalState } from '../store/state.js';
import { findItem } from '../utils/utils.js';
import { Breadcrumbs } from './breadcrumbs.js';
import { Icon } from './icon.js';
import { Input } from './input.js';
import { TodoItemView } from './todo-item-view';

export const Home = () => {
	const { gState } = useGlobalState();
	const { itemId } = useParams();
	const item = itemId ? findItem(itemId, gState.items) : null;
	const rootItems = itemId ? item?.details?.items ?? [] : gState.items;
	return (
		<>
		<Breadcrumbs />
		<div className='main-app'>
			<Input itemId={itemId} />
			<div className='item-list'>
				{rootItems?.length === 0
					? <span className='no-data-placeholder'><Icon>published_with_changes</Icon></span>
					: rootItems.map((item) => (
						<TodoItemView item={item} key={item.id.toString()} />
					))}
			</div>
		</div>
		</>
	)
}
