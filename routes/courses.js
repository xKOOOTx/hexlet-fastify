import { courses } from '../mockdata/courses.js'

export default (app) => {
    app.get('/courses', async (req, res) => {

        const { name, description } = req.query

        const filteredCourses = courses.filter(course => {
            const matchesName = !name || 
                course.name.toLowerCase().includes(name.toLowerCase())

            const matchesDescription = !description ||
                course.description.toLowerCase().includes(description.toLowerCase())

            return matchesName && matchesDescription
        })

        return res.view('pages/courses/courses', {courses: filteredCourses, name, description})
    })

    app.get('/courses/:id', async (req, res) => {
        const { id } = req.params
        const course = courses.find(el => {
            console.log('el: ', el)
            return el.id === Number(id)
        })

        if(!course) return res.code(404).send('Курс с таким id не найден')
        return res.view('pages/courses/course', course)
    })

    app.get('/courses/new', (req, res) => res.view('pages/courses/new'))
    app.post('/courses/new', (req, res) => {
        const { name, description } = req.body

        courses.push({
            id: courses.length + 1,
            name,
            description
        })

        return res.redirect('/courses')
    })
}