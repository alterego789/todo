export interface Actions<Q, M, E> {
	query: Q,
	mutation: M,
	event: E
}