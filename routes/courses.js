import yup from 'yup'
import { addCourse, getCourses, getCourseById } from '../repositories/courses.js'

export default (app) => {
    app.get('/courses', { name: 'courses' }, async (req, res) => {
        const { name, description } = req.query
        const courses = getCourses({name, description})

        return res.view('pages/courses/courses', {courses, name, description})
    })

    app.get('/courses/:id', { name: 'course' }, async (req, res) => {
        const { id } = req.params

        const course = getCourseById(id)

        if(!course) return res.code(404).send('Курс с таким id не найден')
        return res.view('pages/courses/course', course)
    })

    app.get('/courses/new', { name: 'newCourseForm' }, (req, res) => res.view('pages/courses/new'))

    app.post('/courses/new', {
        name: 'createNewCourse',
        attachValidation: true,
        schema: {
            body: yup.object({
                name: yup.string().min(2, 'Название курса должно быть не меньше двух символов'),
                description: yup.string().min(10, 'Описание курса должно быть не меньше 10 символов')
            })
        },
        validatorCompiler:
            ({ schema }) => 
            (data) => {
                try {
                    const result = schema.validateSync(data);
                    return { value: result }
                } catch (e) {
                    return { error: e }
                }
            }
    }, (req, res) => {
        const { name, description } = req.body;
        
        if (req.validationError) {
            const data = {
                name,
                description,
                error: req.validationError
            }

            res.view('pages/courses/new', data)
            return;
        }

        const course = {
            name,
            description
        }

        addCourse(course)

        res.redirect(app.reverse('courses'))
    })
}