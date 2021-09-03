const mongodb = require('mongodb')

module.exports = async (app) => {
  // Création d'un utilisateur
  app.post(
    '/users',
    {
      schema: {
        body: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const result = await app.db.collection('users').insertOne(request.body)

        const user = await app.db.collection('users').findOne({
          _id: mongodb.ObjectId(result.insertedId),
        })

        reply.code(201)

        return user
      } catch (e) {
        if (e.code && e.code === 11000) {
          reply.code(400)

          return { message: 'email already exists' }
        }

        reply.code(500)

        return e
      }
    }
  )

  // Récupération des utilisateurs
  app.get('/users', async () => {
    return app.db.collection('users').find().toArray()
  })
}
