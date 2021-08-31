// On importe la librairie fastify
const fastify = require('fastify')

// Créer une application fastify.
// Une application fastify c'est ce qui vas contenir
// toutes nos routes
const app = fastify({ logger: true })

// Création d'une route GET sur le chemin "/"
app.get('/', function () {
  return 'Coucou les amis !!!'
})

// On lance le serveur sur le port 8080
app.listen(8080)
