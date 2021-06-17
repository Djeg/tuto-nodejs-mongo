export default (app, opts, done) => {
  app.addSchema({
    $id: 'article',
    title: 'article',
    description: 'Un article de blog',
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

  app.addSchema({
    $id: 'article_update',
    title: 'article',
    description: 'Un article de blog',
    type: 'object',
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
