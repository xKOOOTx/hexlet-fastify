export default async (app, _options) => {
app.get('/', async (req, res) => {
        const { name } = req.query;
        res.send(`Hello, ${name ? name : 'World'}!`)
    })
}