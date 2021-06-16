module.exports = (app, opts, done) => {
  app.addSchema({
    $id: 'article',
    type: 'object',
    required: ['title', 'description', 'images', 'author'],
    properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      images: {
        type: 'array',
        items: { type: 'string' },
      },
      author: {
        type: 'object',
        required: ['firstname', 'lastname'],
        properties: {
          firstname: { type: 'string' },
          lastname: { type: 'string' },
        },
      },
    },
  })

  done()
}
