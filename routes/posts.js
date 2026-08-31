import { posts } from "../mockdata/posts.js"

export default (app) => {
    app.get('/posts', { name: 'posts' }, async (req, res) => {
        return res.view('pages/posts/posts', {posts})
    })

    app.get('/posts/:id', { name: 'post' }, async(req, res) => {
        const { id } = req.params;
        const post = posts.find(el => el.id === Number(id))

        if (!post) return res.code(404).send('Такого поста нет');
        return res.view('pages/posts/post', post)
    })
}