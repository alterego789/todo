import { UserActions } from '@ubi-todo/shared';
import { store } from '../store.js';

export const userActions: UserActions = {
	query: {
		getUserInfo: (userId) =>  store.query('users', 'getUserInfo', userId),
		getActiveUser: () => store.query('users', 'getActiveUser')
	},
	mutation: {
		register: (info) => store.mutation('users', 'register', info),
		login: (info) => store.mutation('users', 'login', info),
		logout: () => store.mutation('users', 'logout')
	},
	event: {}
}