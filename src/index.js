/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'
import createBook from './plugins/books/create-book.js'


/**
 * Voici la fonction principale de notre programme
 */
async function main() {
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
   * Nous enregistrons le plugin "createBook" dans
   * notre application :
   */
  app.register(createBook)

  /**
   * Créer et enregistrer dans l'index les plugins suivants :
   * 
   * - plugins/books/list-book.js (qui contiendra la route GET /books)
   * - plugins/books/get-book.js (qui contiendra la route GET /books/:id)
   * 
   * (bonus : nous pouvons aussi créer le propre fichier pour la constante books)
   */

  /**
   * Contient tout les livres de l'api
   */
  const books = [
    { id: 1, title: "Harry Potter" },
    { id: 2, title: "Livre 2" },
    { id: 3, title: "Livre 3" },
    { id: 4, title: "Livre 4" },
    { id: 5, title: "Livre 5" },
  ]

  /**
   * 2. Créer une route GET /books qui retourne la collection suivante :
   * [
   *  { id: 1, title: "Harry Potter" },
   *  { id: 2, title: "Livre 2" },
   *  { id: 3, title: "Livre 3" },
   *  { id: 4, title: "Livre 4" },
   *  { id: 5, title: "Livre 5" },
   * ]
   * 4. Ajouter la possibilité avec la route GET /books de limiter
   *    le nombre résultat (ex: GET /books?limit=2 j'obtient que 2 livres).
   *    Vous pouvez vous aider de `request.query`
   */
  app.get('/books', (request) => {
    const limit = parseInt(request.query.limit)

    if (!limit) {
      return books
    }

    return books.slice(0, limit)
  })

  /**
   * 3. Créer une route GET /books/:id qui affiche le document
   *    livre avec l'id demandé en paramètre.
   */
  app.get('/books/:id', (request, reply) => {
    const id = parseInt(request.params.id)

    let book = books.find(book => book.id === id)

    if (!book) {
      reply.code(404)

      return { message: 'No book' }
    }

    return book
  })


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
}

/**
 * Nous appelons fonction principale qui démarre notre application
 */
main()