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
 * Nous pouvons définir tout pleins de routes.
 * Une route correspond à un chemin donnée sur notre
 * server (on appel ça une resource)
 */
app.get('/', () => 'Test')

// Essayer de créer une route "/test" qui affiche un test

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
