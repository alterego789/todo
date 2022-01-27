import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGlobalState } from '../store/state.js';
import { buildTree } from '../utils/utils.js';
import { Icon } from './icon.js';


export const Breadcrumbs = () => {
	const { gState } = useGlobalState();
	const { itemId } = useParams();
	const tree = buildTree(itemId as string, gState.items).reverse();
	return (
		<div className='breadcrumbs'>
			<span className='breadcrumb-item'>
				<Link to='/'><Icon>home</Icon></Link>
			</span>
			{
				tree.map(it =>
					<span className='breadcrumb-item'  key={it.id.toString()}>
						<Link to={'/todo/' + it.id}>
							{it.title}
						</Link>
					</span>
				)
			}
		</div>
	)
}