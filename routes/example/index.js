export default async function (app, options) {
  app.get('/', async function (request, reply) {
    return 'this is an example'
  })
}
