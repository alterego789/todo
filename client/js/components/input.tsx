import { TodoItem, UUID } from '@ubi-todo/shared';
import React, { useCallback, useState } from 'react';
import { useGlobalState } from '../store/state.js';
import { makeTodoItem } from '../store/todo-item.js';

type props = {
	itemId?: UUID<TodoItem> | string
}
export const Input = ({itemId}: props) => {
	const {actions} = useGlobalState();
	const input = React.useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string>();
	const handleKeyPress = useCallback((event) => {
		// TODO: extract input form event.target =)
		if (event.which !== 13 || !input.current) {
			return; 
		}
		const value = input.current.value.trim();
		if (!value) {
			return;
		}
		input.current.value = '';
		const item = makeTodoItem(value, itemId as UUID<TodoItem> );
		actions.addItem(item, itemId);
	}, [itemId]);

	const handleChange = useCallback((event) => {
		if (!input.current) {
			return; 
		}
		// TODO: extract input form event
		const value = input.current.value.trim();
		if(input.current.value && !value){
			setError('Value cannot be blank');
			return;
		}
		
		if(value.length > 255){
			setError('Input value is too long');
			return;
		}
		setError('');
	}, []);

	return (
		<div className='main-input'>
			<label>Enter todo item and hit enter
				<input ref={input} 
					onKeyPress={handleKeyPress} 
					onChange={handleChange}
				/>
			</label>
			{/* TODO: use classNames */}
			<span className={'input-error ' + (error ? 'fade-in' : 'fade-out')}>{error}</span>
		</div>
	);
};