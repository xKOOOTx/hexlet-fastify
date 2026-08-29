import escape from 'escape-html'

export default (app) => {
    app.get('/xss', async (req, res) => {
        return res.view('/pages/xss/xss', {
            id: escape(req.query.id)
        });
    });
    app.post('/xss', async (req, res) => {
        if (req.headers['sec-fetch-site'] === 'cross-site') {
            return res.code(403).send('Forbidden');
        }
        return res.send('POST OK');
    });
}