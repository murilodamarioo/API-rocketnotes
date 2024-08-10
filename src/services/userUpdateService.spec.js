const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory")
const UserUpdateService = require("./UserUpdateService")

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
    
    expect(userUpdate).toEqual(true)
  })
})