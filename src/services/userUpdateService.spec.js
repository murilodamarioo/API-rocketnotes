const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const UserUpdateService = require("./UserUpdateService")
const AppError = require("../utils/AppError")

describe('UserUpdateService', () => {
  let userRepositoryInMemory = null
  let userUpdateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory
    userUpdateService = new UserUpdateService(userRepositoryInMemory)
  })

  it('should update user name and email', async () => {
    const user = {
      user_id: 1,
      name: 'John Doe',
      email: 'john@email.com',
    }

    const userUpdate = await userUpdateService.execute(user)
    
    expect(userUpdate).toHaveProperty('user_id')
  })

  it('should not update user password without old password', async () => {
    const user = {
      user_id: 1,
      password: '12345'
    }

    await expect(userUpdateService.execute(user)).rejects.toEqual(new AppError('Você precisa informar a senha antiga'))
  })

  it('should not update user email with existing email', async () => {
    const user = {
      user_id: 1,
      email: 'billie@email.com'
    }

    await expect(userUpdateService.execute(user)).rejects.toEqual(new AppError('Este email já está em uso.'))
  })
})