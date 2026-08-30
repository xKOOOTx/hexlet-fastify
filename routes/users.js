import { users } from '../mockdata/users.js'

export default (app) => {
    app.get('/users', async (req, res) => res.view('pages/users/users', { users }))
    app.get('/users/:id', async (req, res) => {
        const { id } = req.params
        const user = users.find(el => el.id === id)

        if (!user) return res.code(404).send('Пользователь с таким id не найден')
        return res.view('pages/users/user', user)
    })
    app.get('/users/new', async (req, res) => res.view('pages/users/user-new'))
    app.post('/users/new', async (req, res) => {
        const { username, email } = req.body
        const normalizedEmail = email.trim().toLowerCase()
        const foundUserByEmail = users.find(el => el.email === normalizedEmail)
        if (foundUserByEmail) return res.code(409).view('pages/users/user-new', {username, email, message: 'Пользователь с таким email уже существует'})

        users.push({id: `qwe-asd-${users.length}`, username, email})
        return res.redirect('/users');
    })
}