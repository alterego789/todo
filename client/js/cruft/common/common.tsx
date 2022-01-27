import { User } from '@ubi-todo/shared';
import { useEffect, useState } from 'react';
import { userActions } from '../../store/store.js';

export const syncUser = () => {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		userActions.query.getActiveUser();
	}, []);
	return [user, setUser];
}