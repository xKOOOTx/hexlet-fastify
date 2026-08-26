export default async function (app, options) {
  app.get('/', async function (req, res) {
    res.type('text/html');
    console.log('header: ', res.getHeader('content-type'));
    res.send('<h1>Hello Hexlet</h1>')
  })
}
