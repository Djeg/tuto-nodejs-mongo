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
 * Nous pouvons démarer un server logique sur
 * notre machine
 */
app.listen(3030, 'localhost', () => {
  console.log("Le server est disponible sur l'adresse : http://localhost:3030")
})
