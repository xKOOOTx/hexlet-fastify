import { users } from '../mockdata/users.js'
import yup from 'yup';
import encrypt from '../utils/encrypt.js';

export default (app) => {
    app.get('/u', { name: 'users' }, async (req, res) => res.view('pages/users/users', { users }))
    app.get('/u/:id', { name: 'user'}, async (req, res) => {
        const { id } = req.params
        const user = users.find(el => el.id === id)

        if (!user) return res.code(404).send('Пользователь с таким id не найден')
        return res.view('pages/users/user', user)
    })
    app.get('/u/new', { name: 'newUserForm' }, async (req, res) => res.view('pages/users/user-new'))

    app.post('/u/new', {
        name: 'createNewUser',
        attachValidation: true,
        schema: {
            body: yup.object({
                name: yup.string().min(2, 'Имя должно быть не меньше двух символов'),
                email: yup.string().email(),
                password: yup.string().min(5),
                passwordConfirmation: yup.string().min(5)
            })
        },
        validatorCompiler: 
            ({ schema, method, url, httpPart }) => 
            (data) => {
                if (data.password !== data.passwordConfirmation) {
                    return {
                        error: Error("Password confirmation is not equal the password")
                    };
                }
                try {
                    const result = schema.validateSync(data);
                    return { value: result };
                } catch (e) {
                    return { error: e };
                }
            },
    }, (req, res) => {
        const { name, email, password, passwordConfirmation } = req.body;

        if (req.validationError) {
            const data = {
                name,
                email,
                password,
                passwordConfirmation,
                error: req.validationError
            };

            res.view("pages/users/user-new", data);
            return;
        }

        const user = {
            id: `qwert-asdfg-zxcc-4235${users.length}`,
            name,
            email,
            password,
        }

        users.push(user)

        res.redirect(app.reverse('users'))
    })

    app.get('/u/log-in', { name: 'log-in' }, (req, res) => {

        res.view('pages/users/log-in')
    })

    app.post('/u/log-in', { name: 'user-log-in' }, (req, res) => {
        const { email, password } = req.body

        const user = users.find(el => el.email === email)

        if (!user) return res.code(404).send('User not found')
        req.session.userId = user.id

        res.redirect('/')
    })

    app.get('/u/log-out', { name: 'log-out' }, (req, res) => {
        if (!req.session.userId) {
            res.redirect('/')
        }

        delete req.session.userId
        res.redirect('/')
    })
    
}