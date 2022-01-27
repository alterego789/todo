import { UUID } from "../lib/uuid.js";

export interface User {
	id: UUID<User>;
	email: string;
}

export interface LoginInfo {
	email: string;
	password: string;
}