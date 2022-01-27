import { TodoItem } from '@ubi-todo/shared';
import React, { useCallback } from "react";
import { useGlobalState } from '../store/state.js';

type Props = {
	item: TodoItem
};
export const EditDetails = ({ item }: Props) => {
	const { actions } = useGlobalState([item]);
	const updateDetails = useCallback((e) => {
		const val = e.target.value;
		actions.updateItemDetails(item)(val);
	}, []);
	return (
		<div className="item-description">
			<textarea
				className='textarea'
				onInput={updateDetails}
				value={item.details.description}
			>
			</textarea>
		</div>
	)
}