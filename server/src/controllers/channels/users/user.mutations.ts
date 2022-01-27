import { LoginInfo, User, UserActions } from '@ubi-todo/shared';
import { newUUID } from '../../../lib/uuid.js';

type Mutation = UserActions['mutation'];
export class UserMutations implements Mutation {
	register: (user: LoginInfo) => Promise<User>;
	login: (loginInfo: LoginInfo) => Promise<User> = async () => {
		return {
			email: 'stuff',
			id: newUUID()
		}
	};
	logout: () => void;

}