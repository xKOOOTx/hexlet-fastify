import { users } from '../mockdata/users.js'

export default (app) => {
    app.get('/users', async (req, res) => res.view('pages/users/users', { users }))
    app.get('/users/:id', async (req, res) => {
        const { id } = req.params
        const user = users.find(el => el.id === id)

        if (!user) return res.code(404).send('Пользователь с таким id не найден')
        return res.view('pages/users/user', user)
    })
}