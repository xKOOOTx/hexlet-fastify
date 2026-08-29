export default async (app, options) => {
    /* root */
    app.get('/', async (req, res) => res.view('index'))

    /* about */
    app.get('/about', async (req, res) => res.view('about'))

    /* posts users etc are loaded automatically by users.js posts.js etc */
}
