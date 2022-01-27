import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../store/state.js';
import { ws } from '../store/store.js';


export const Wsconnector = () => {
	const {gState} = useGlobalState();
	const [, setState] = useState({
		ready: ws.ws.readyState === ws.ws.OPEN
	});
	useEffect(() => {
		const onOpen = () => {
			setState({
				ready: true
			})
		};
		ws.ws.addEventListener('open', onOpen);
		
		return () => {
			ws.ws.removeEventListener('open', onOpen);
		}
	}, [gState]);


	return (
		<div className='ws-connector'></div>
	)
};
