import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from './icon.js'

export const NotFound = () => {
	return (
		<h1 className='error'><Link to='/'><Icon>home</Icon></Link> 404 - Not found <Icon>error_outline</Icon></h1>
	)
}