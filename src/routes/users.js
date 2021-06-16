const crypto = require('crypto')

module.exports = (app, opts, done) => {
  app.post(
    '/authenticate',
    { schema: { body: { $ref: 'credential' } } },
    async (request, reply) => {
      const user = await app.db.collection('users').findOne({
        email: request.body.email,
      })

      if (!user) {
        reply.code(400)

        return { message: 'Invalid email' }
      }

      const password = crypto
        .createHash('sha256')
        .update(request.body.password)
        .digest('base64')

      if (user.password !== password) {
        reply.code(400)

        return { message: 'Invalid password' }
      }

      reply.code(201)

      return { token: app.jwt.sign(user) }
    }
  )

  app.post(
    '/users',
    { schema: { body: { $ref: 'user' } } },
    async (request, reply) => {
      // On enregistre l'utilisateur dans la BDD
      const password = crypto
        .createHash('sha256')
        .update(request.body.password)
        .digest('base64')

      const { insertedId } = await app.db
        .collection('users')
        .insertOne({ ...request.body, password: password })

      // On récupére l'utilisateur depuis la BDD
      const user = await app.db.collection('users').findOne({ _id: insertedId })

      reply.code(201)

      return user
    }
  )

  app.get('/users', async (request) => {
    await request.jwtVerify()

    const users = await app.db.collection('users').find().toArray()

    return users
  })

  done()
}
