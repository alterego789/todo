import { UUID } from '@ubi-todo/shared';

// consider lexicographically sorted uuid - to be more DB friendly
// TODO: run bechmarks
export function newUUID<T>(): UUID<T> {
	// only availabe on https and chromium 92+
	// @ts-ignore
	if ('randomUUID' in crypto) {
		// @ts-ignore - TODO: remove after ts typing / version update
		return crypto.randomUUID() as UUID<T>;
	}
	
	// some fallcback implementation from stackoverflow
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	}) as unknown as UUID<T>;
}