import React from 'react'

type props = {
	children: any;
	onClick?: (...args: any[]) => void
};

export const Icon = ({children, onClick}: props) => {
	return (
		<span className='ico' onClick={onClick}>{children}</span>
	)
}