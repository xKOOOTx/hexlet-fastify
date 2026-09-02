import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(":memory:");

db.exec(`
  CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
  );

  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAT(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL
  );
`);

export default db;