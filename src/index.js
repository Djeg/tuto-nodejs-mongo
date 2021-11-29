/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'

/**
 * Nous pouvons créer une application fastify
 */
const app = Fastify({
  /* Ici nous spécifions des options.
  l'option logger nous permet de débugger notre
  serveur lorsque nous avons des erreurs */
  logger: true,
})

/**
 * 1. Créer une route POST /books qui retourne un réponse
 *    avec le status code : 201 (il faut utiliser l'objet reply) et
 *    l'objet suivant : { id: 1, title: "Harry Potter" }
 * 2. Créer une route GET /books qui retourne la collection suivante :
 * [
 *  { id: 1, title: "Harry Potter" },
 *  { id: 2, title: "Livre 2" },
 *  { id: 3, title: "Livre 3" },
 *  { id: 4, title: "Livre 4" },
 *  { id: 5, title: "Livre 5" },
 * ]
 * 3. Créer une route GET /books/:id qui affiche le document
 *    livre avec l'id demandé en paramètre.
 * 4. Ajouter la possibilité avec la route GET /books de limiter
 *    le nombre résultat (ex: GET /books?limit=2 j'obtient que 2 livres).
 *    Vous pouvez vous aider de `request.query`
 */

/**
 * Nous pouvons définir tout pleins de routes.
 * Une route correspond à un chemin donnée sur notre
 * server (on appel ça une resource)
 */
app.get('/', () => 'Test')

/**
 * Il est possible de créer des routes avec des paramètres
 */
app.get('/additionner/:number1/:number2', (request, reply) => {
  reply.header('Content-Type', 'text/html')

  return `
<html> 
  <head>
    <title>test</title> 
  </head>
  
  <body>
    <h1>Le résultat est : ${
      parseInt(request.params.number1) + parseInt(request.params.number2)
    }</h1>
  </body>
  
</html>
  `
})

// Essayer de créer une route "/test" qui affiche un test
app.get('/test', () => 'Test 2')

/**
 * Nous pouvons démarer un server logique sur
 * notre machine
 */
app.listen(
  /* Le port */ 3030,
  /* l'adresse de la machine, ici notre machine */ 'localhost',
  /* Une fonction qui se lance, un fois le server demarré */ () => {
    console.log(
      "Le server est disponible sur l'adresse : http://localhost:3030",
    )
  },
)
