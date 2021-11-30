/**
 * Importer mongodb
 */
import mongo from 'mongodb'

/**
 * Création du plugin qui vas décorer notre application
 * avec la base de données
 */
export default async function dbDecorator(app) {
  /**
   * Nous nous connéctons à notre base de données
   * et recevons un client mongodb
   */
  const client = await mongo.MongoClient.connect(
    /**
     * Vous pouvez récupérer l'url de la base de données
     * direction sur MongoDB Atlas (cliqué sur : "databases" et
     * en suite le bouton "connect" de votre cluster).
     * 
     * !ATTENTION! Il faut remplace "<password>" par le vrai
     * mot de passe ! Et aussi remplacer "myFirstDatabase" par
     * le nom de votre base de données
     */
    'mongodb+srv://libshop:libshop@cluster0.ssnpb.mongodb.net/libshop?retryWrites=true&w=majority'
  )

  /**
   * Nous pouvons maintenant créer une référence
   * vers la base de donnnées
   */
  const db = client.db('libshop')

  /**
   * Pour terminer nous créons un décorateur
   * sur notre application
   */
  app.decorate('db', db)
}