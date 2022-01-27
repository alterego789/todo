import { UUID } from '@ubi-todo/shared';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { INIT_START, useGlobalState } from '../store/state.js';
import { calculateItemCompletion, findItem } from '../utils/utils.js';
import { Breadcrumbs } from './breadcrumbs.js';
import { EditDetails } from './edit-item-details.js';
import { Icon } from './icon.js';
import { Input } from './input.js';
import { NotFound } from './not-found.js';
import { TodoItemView } from './todo-item-view';

export const App = () => {
	const { itemId } = useParams();
	const { gState, actions } = useGlobalState([itemId]);
	const item = findItem(itemId as string, gState.items);
	const children = item?.details.items;

	if(gState.init === INIT_START){
		if(itemId){
			actions.loadDetails(itemId);
		}
		return <div className='main-app'>loading...</div>;
	}

	if (!item?.details.items) {
		return (
			<div className='main-app'>
				<NotFound />
			</div>
		)
	}
	const completion = calculateItemCompletion(item);
	return (
		<>
			<Breadcrumbs />
			{/* TODO: move to app shell */}
			<div className='main-app'>
				<h2>{item.title} {completion[1] ? completion.join('/') : null}</h2>
				<Input itemId={itemId} />
				<div className='item-details'>
					<div className='item-list'>
						{children?.length === 0
							? <span className='no-data-placeholder'><Icon>published_with_changes</Icon></span>
							: children?.map((it) => (
								<div key={it.id.toString()} className='item-container'>
									<TodoItemView item={it} />
								</div>
							))
						}
					</div>
					<EditDetails item={item} />
				</div>
			</div>
		</>
	)
}
