export default async function (app, options) {
  app.get('/', async function (req, res) {
    res.send('Welcome to Hexlet!')
    // return { root: true }
  })
}
