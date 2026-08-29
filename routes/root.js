import { posts } from '../mockdata/posts.js'
import { users } from '../mockdata/users.js'

export default async (app, options) => {
  app.get('/', async (req, res) => res.view('index'))

  app.get('/about', async (req, res) => res.view('about'))

  app.get('/posts', async (req, res) => res.view('pages/posts', {posts}))
  app.get('/posts/:id', async(req, res) => {
    const { id } = req.params;
    const post = posts.find(el => el.id === Number(id))

    if (!post) return res.code(404).send('Такого поста нет');
    return res.view('pages/post', post)
  })

  app.get('/users', async (req, res) => res.view('pages/users/users', { users }))
  app.get('/users/:id', async (req, res) => {
    const { id } = req.params
    const user = users.find(el => el.id === id)

    if (!user) return res.code(404).send('Пользователь с таким id не найден')
    return res.view('pages/users/user', user)
  })
}
