const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')

class UserUpdateService {
  constructor(userRespository) {
    this.userRespository = userRespository
  }

  async execute({ name, email, password, old_password, user_id }) {
    const user = await this.userRespository.findById(user_id)

    if (!user) {
      throw new AppError("Usuário não encontrado")
    }

    const userWithUpdatedEmail = await this.userRespository.findByEmail(email)

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este email já está em uso.")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password) {
        throw new AppError("Você precisa informar a senha antiga")
    }

    if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password)

        if (!checkOldPassword) throw new AppError("A senha antiga não confere")

        user.password = await hash(password, 8)
    } else {
        user.password = user.password
    }

    const userUpdated = await this.userRespository.update(user.name, user.email, user.password, user_id)

    return userUpdated
  }
}

module.exports = UserUpdateService