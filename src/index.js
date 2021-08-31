// On importe la librairie fastify
const fastify = require('fastify')

// Créer une application fastify.
// Une application fastify c'est ce qui vas contenir
// toutes nos routes
const app = fastify({ logger: true })

// Création d'une route GET sur le chemin "/"
app.get('/', (request) => {
  return 'Coucou les amis !!!'
})

const a = () => {
  return { status: 200 }
}

// Récupére les catégories
app.get('/categories', () => ['animale', 'nature', 'science', 'technologie'])

// Création d'une catégorie
app.post('/categories', () => ({ status: 200 }))

// Récupére les articles
app.get('/articles', () => [{ title: 'Mon premier article' }])

// Création d'un article
app.post('/articles', () => ({ status: 200 }))

// On lance le serveur sur le port 8080
app.listen(8080)
