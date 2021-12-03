import BaseModel from '../lib/base-model.js'
import { createHmac } from 'crypto'

/**
 * Model d'un utilisateur. Permet de communiquer
 * avec la base de données
 */
export default class UserModel extends BaseModel {
  /**
   * Redefinissions de la fonction create qui accepte
   * un NewUser et qui crypte le mot de passe
   */
  create(newUser) {
    console.warn(createHmac)
    newUser.password = createHmac('sha256', process.env.API_SECRET)
      .update(newUser.password)
      .digest('hex')

    return super.create(newUser)
  }
}
