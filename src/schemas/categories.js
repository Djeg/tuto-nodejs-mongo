export default (app, opts, done) => {
  // Nous ajoutons un schema dans notre application
  // avec l'identifiant Category
  app.addSchema({
    $id: 'category',
    type: 'object',
    properties: {
      titre: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    },
    required: ['titre'],
  })

  app.addSchema({
    $id: 'category_update',
    type: 'object',
    properties: {
      titre: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
    },
  })

  done()
}
