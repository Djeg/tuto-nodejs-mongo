// Require la librairie fastify
const fastify = require('fastify')

// On créé une application
const app = fastify({ logger: true })

// On lui attache « la route » (le path, l'URI, chemin)  suivi
// d'une callback en utilisant la fonction « get »
app.get('/', () => {
  return 'Hello World'
})

app.get('/hello', () => {
  return 'Hello World !!!!!'
})

const start = async () => {
  await app.listen(4545)
}

start()
