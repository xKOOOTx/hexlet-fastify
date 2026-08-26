const state = {
    posts: [
    {
        id: 1,
        desciption: 'Course 1'
    },
    {
        id: 2,
        desciption: 'Course 2'
    },
    {
        id: 3,
        desciption: 'Course 3'
    },
    {
        id: 4,
        desciption: 'Course 4'
    },
    {
        id: 5,
        desciption: 'Course 5'
    },
]
}
export default async (app, _options) => {
    app.get('/', async (req, res) => {
        res.redirect('/posts/1')
    })
    app.get('/:id', async (req, res) => {

        const {id} = req.params;
        const post = state.posts.find(post => post.id === parseInt(id))

        if(!post) {
            res.code(404).send('404')
        }
        res.send(post)
    })
}