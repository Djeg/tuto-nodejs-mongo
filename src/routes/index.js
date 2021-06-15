/*
Nous exportons une fonction plugin qui accépte
3 arguments:
1. L'application fastify
2. Des options
3. Une fonction à appeler une fois que notre plugin
   est terminé
*/
module.exports = (app, opts, done) => {
  app.get('/', () => {
    return 'Hello World'
  })

  done()
}
