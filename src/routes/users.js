module.exports = (app, opts, done) => {
  app.post(
    '/users',
    { schema: { body: { $ref: 'user' } } },
    async (request, reply) => {
      // On enregistre l'utilisateur dans la BDD
      const { insertedId } = await app.db
        .collection('users')
        .insertOne(request.body)

      // On récupére l'utilisateur depuis la BDD
      const user = await app.db.collection('users').findOne({ _id: insertedId })

      reply.code(201)

      return user
    }
  )

  app.get('/users', async () => {
    const users = await app.db.collection('users').find().toArray()

    return users
  })

  done()
}
