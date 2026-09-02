import db from '../db/index.js'

export const getUsers = () => {
    return db.prepare('SELECT * FROM users;').all()
}

export const getUserById = (id) => {
    return db.prepare('SELECT * FROM users WHERE id = ?;').get(id)
}

export const addUser = (user) => {
    return db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?,?,?);').run(user.name, user.email, user.password_hash)
}