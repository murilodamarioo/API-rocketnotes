const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory")
const AppError = require('../../utils/AppError')

describe('UserCreateService', () => {
  let userRepositoryInMemory = null
  let userCreateService = null

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemory)
  })


  it('should create user', async () => {
    const user = {
      name: 'Michael',
      email: 'michael@email.com',
      password: '123'
    }
  
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty('id')
  })

  it('should not create user with existing email', async () => {
    const user1 = {
      name: 'User One',
      email: 'userone@email.com',
      password: '123'
    }

    const user2 = {
      name: 'User Two',
      email: 'userone@email.com',
      password: '123'
    }

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError('Este e-mail já está cadastrado'))
  })
})



