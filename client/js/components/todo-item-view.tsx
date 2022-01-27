import React from "react"
import { TodoItem } from '@ubi-todo/shared';
import { Icon } from './icon.js';
import { useGlobalState } from '../store/state.js';
import { Link } from 'react-router-dom';
import { calculateItemCompletion } from '../utils/utils.js';

type Props = {
	item: TodoItem
};
export const TodoItemView = ({ item }: Props) => {
	const { actions } = useGlobalState([item]);
	const completion = calculateItemCompletion(item);
	return (
		<div
			className="todo-item"
			key={item.id.toString()}
		>
			<span className='drag-handle'></span>
				{/* TODO: move links to functions */}
			<Link to={`/todo/${item.id}`}>
				<span className={item.completed ? 'strikethrough' : ''}>{item.title}</span> {completion[1] ? completion.join('/') : null}
			</Link>
			<span>
				<span>
					{
						item.completed
							? <span className='tick absolute'><Icon>done</Icon></span>
							: null
					}
					<Icon onClick={actions.toggleItemState(item.id)}>crop_square</Icon>
				</span>
				<Icon onClick={actions.removeItem(item.id)}>delete</Icon>
			</span>
		</div>
	)
}