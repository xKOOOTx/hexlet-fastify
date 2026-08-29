export default (app) => {
    app.get('/courses', async (req, res) => {
        return res.view('pages/courses')
    })
}