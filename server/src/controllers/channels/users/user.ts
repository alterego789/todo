import { UserActions } from '@ubi-todo/shared';
import { BaseChannel } from "../base-channel.js";
import { UserMutations } from './user.mutations.js';
import { UserQueries } from './user.queries.js';

export class Users extends BaseChannel implements UserActions {
	query = new UserQueries;
	mutation = new UserMutations;
	event: {};
	
}