import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./db.sqlite');
db.run(`
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY,
	fullName TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS items (
	id INTEGER PRIMARY KEY,
	ownerId INTEGER,
	title TEXT NOT NULL,
	description TEXT,
	completed INTEGER,
	locked INTEGER,
	path TEXT,
	order INTEGER NOT NULL,
	cost REAL,
	type TEXT,

	FOREIGN KEY (ownerId)
	REFERENCES users (id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS itemData (
	id INTEGER PRIMARY KEY,
	itemId INTEGER,
	key TEXT,
	value TEXT,

	FOREIGN KEY (itemId)
	REFERENCES items (id)
		ON DELETE CASCADE
);

`);