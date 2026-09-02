import db from '../db/index.js'

export const getCourses = ({name, description}) => {
    let query = 'SELECT * FROM courses';
    const conditions = [];
    const params = [];

    if (name) {
        conditions.push('name LIKE ?');
        params.push(`%${name}%`);
    }
    if (description) {
        conditions.push('description LIKE ?');
        params.push(`%${description}%`)
    }
    if (conditions.length) {
        query += ` WHERE ${conditions.join(' AND ')}`
    }
    return db.prepare(query).all(...params)
}

export const addCourse = (course) => {
    return db.prepare(`INSERT INTO courses (name, description) VALUES (?, ?)`).run(course.name, course.description)
}

export const getCourseById = (id) => {
    return db.prepare(`SELECT * FROM courses WHERE id = ?;`).get(id)
}