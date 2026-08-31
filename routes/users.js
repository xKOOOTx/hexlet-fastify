import { users } from '../mockdata/users.js'
import yup from 'yup';

export default (app) => {
    app.get('/users', async (req, res) => res.view('pages/users/users', { users }))
    app.get('/users/:id', async (req, res) => {
        const { id } = req.params
        const user = users.find(el => el.id === id)

        if (!user) return res.code(404).send('Пользователь с таким id не найден')
        return res.view('pages/users/user', user)
    })
    app.get('/users/new', async (req, res) => res.view('pages/users/user-new'))

    app.post('/users/new', {
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

        res.redirect('/users')
    })
}