// Require la librairie fastify
const fastify = require('fastify')

// On créé une application
const app = fastify({ logger: true })

// On lui attache « la route » (le path, l'URI, chemin)  suivi
// d'une callback en utilisant la fonction « get »
app.get('/', () => {
  return 'Hello World'
})

app.get('/categories', () => {
  return ['animale', 'nature', 'science', 'technologie']
})

app.post('/categories', (request, reply) => {
  reply.code(201)
  reply.header('X-Powered-By', 'fastify')

  console.warn(request.body.description)

  return { status: 200 }
})

app.get('/articles', () => {
  return [{ title: 'Mon premier article' }]
})

app.post('/articles', (request) => {
  console.warn(request.body.title)

  return { status: 200 }
})

const start = async () => {
  await app.listen(4545)
}

start()
