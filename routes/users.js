import yup from 'yup';
import { getUserById, getUsers, addUser } from '../repositories/users.js';
import bcrypt from 'bcrypt'

export default (app) => {
    app.get('/u', { name: 'users' }, async (req, res) => {
        const users = getUsers();
        console.log('users: ', users)
        return res.view('pages/users/users', { users });
    })
    app.get('/u/:id', { name: 'user'}, async (req, res) => {
        const { id } = req.params
        const user = getUserById(id)

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
    }, async (req, res) => {
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
            name,
            email,
            password_hash: await bcrypt.hash(password, 10),
        }

        // const isValid = await bcrypt.compare(password, user.password_hash)
        addUser(user)

        await res.redirect(app.reverse('users'))
    })

    app.get('/u/log-in', { name: 'log-in' }, (req, res) => {

        res.view('pages/users/log-in')
    })

    app.post('/u/log-in', { name: 'user-log-in' }, (req, res) => {
        const { email, password } = req.body

        const user = []
        // const user = users.find(el => el.email === email)

        if (!user) return res.code(404).send('User not found')
        req.session.set('userId', user.id)


        req.flash("success", "Добро пожаловать")
        res.redirect('/')
    })

    app.post('/u/log-out', { name: 'log-out' }, (req, res) => {

        req.session.delete()

        res.redirect('/')
    })
}

// req.flash("info", "Hello")