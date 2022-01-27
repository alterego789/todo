import { Actions } from '../actions.js';
import { UUID } from '../index.js';
import { LoginInfo, User } from './user.model.js';

interface Queries {
	getUserInfo: (userId: UUID<User>) => Promise<User>;
	getActiveUser: () => Promise<User | null>;
}

interface Mutations {
	register: (user: LoginInfo) => Promise<User>;
	login: (loginInfo: LoginInfo) => Promise<User>;
	logout: () => void;
}

export type UserActions = Actions<Queries, Mutations, {}>
