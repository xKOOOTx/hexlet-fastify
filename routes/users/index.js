export default async function (app, options) {
    app.get('/', async (req, res) => {
        res.send('GET /users')
    })
    app.post('/', async (req, res) => {
        res.send('POST /users')
    })
}