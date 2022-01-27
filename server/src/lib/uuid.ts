import { UUID } from '@ubi-todo/shared';
import {randomUUID} from 'crypto';

// consider lexicographically sorted uuid - to be more DB friendly
export function newUUID<T>(): UUID<T> {
	return randomUUID() as unknown as UUID<T>;
}