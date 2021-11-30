/**
 * Nous importons la librairie fastify
 */
import Fastify from 'fastify'
import createBook from './plugins/books/create-book.js'
import listBook from './plugins/books/list-books.js'
import getBook from './plugins/books/get-book.js'


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
  app.register(listBook)
  app.register(getBook)

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