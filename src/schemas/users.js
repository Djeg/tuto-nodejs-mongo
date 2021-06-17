export default (app, opts, done) => {
  app.addSchema({
    $id: 'user',
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
    },
  })

  app.addSchema({
    $id: 'credential',
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  })

  done()
}
