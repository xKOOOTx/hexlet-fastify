export default (app) => {
    app.get('/about', async (req, res) => res.view('about'))
}