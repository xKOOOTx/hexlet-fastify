
const posts = [
    {
        id: 1,
        description: 'Course 1'
    },
    {
        id: 2,
        description: 'Course 2'
    },
    {
        id: 3,
        description: 'Course 3'
    },
    {
        id: 4,
        description: 'Course 4'
    },
    {
        id: 5,
        description: 'Course 5'
    },
]
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
}
