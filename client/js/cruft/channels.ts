import { TodoItemActions, UserActions } from '@ubi-todo/shared';

export type Channels = {
	items: TodoItemActions;
	users: UserActions;
}

export type Channel = keyof Channels;

// TODO: consider to join query | mutation - as they are using same type



type Queries<T extends Channel> = Channels[T]['query'];
export type QueryActions<T extends Channel> = keyof Queries<T>;
export type Query<T extends Channel, A extends QueryActions<T> = QueryActions<T>> = Queries<T>[A];
export type QueryPayload<T extends Channel, Q = Query<T>> = Q extends (...args: any) => any ? Parameters<Q> : never;
export type QueryReturns<T extends Channel, Q = Query<T>> = Q extends (...args: any) => any 
	? ReturnType<Q> extends Promise<infer U>
		? U
		: ReturnType<Q>
	: never;

type Mutations<T extends Channel> = Channels[T]['mutation'];
export type MutationActions<T extends Channel> = keyof Mutations<T>;
export type Mutation<T extends Channel, A extends MutationActions<T> = MutationActions<T>> = Mutations<T>[A];
export type MutationPayload<T extends Channel, Q = Mutation<T>> = Q extends (...args: any) => any ? Parameters<Q> : never;
export type MutationReturns<T extends Channel, Q = Mutation<T>> = Q extends (...args: any) => any 
	? ReturnType<Q> extends Promise<infer U>
		? U
		: ReturnType<Q>
	: never;
