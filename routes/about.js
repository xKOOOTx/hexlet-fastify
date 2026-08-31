export default (app) => {
    app.get('/about', { name: 'about' }, async (req, res) => res.view('about'))
}