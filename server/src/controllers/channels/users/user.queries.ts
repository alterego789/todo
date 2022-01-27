import { User, UserActions, UUID } from '@ubi-todo/shared';
import { newUUID } from '../../../lib/uuid.js';

type IUserQueries = UserActions['query'];
export class UserQueries implements IUserQueries {
	public getUserInfo: (userId: UUID<User>) => Promise<User>;
	public getActiveUser: () => Promise<User | null> = async () => {
		return {
			email: 'stuff',
			id: newUUID()
		}
	};
}