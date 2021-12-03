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
  async create(newUser) {
    console.warn(createHmac)
    newUser.password = createHmac('sha256', process.env.API_SECRET)
      .update(newUser.password)
      .digest('hex')

    return super.create(newUser)
  }

  /**
   * Retrouve un utilisateur par son email
   */
  async getByEmail(email) {
    const user = await this.db.collection(this.collection).findOne({
      email: email,
    })

    if (!user) {
      throw new Error(`No user with the email ${email}`)
    }

    return user
  }

  /**
   * Test si un mot de passe est valide
   */
  isPasswordValid(user, password) {
    return (
      user.password ===
      createHmac('sha256', process.env.API_SECRET)
        .update(password)
        .digest('hex')
    )
  }
}
