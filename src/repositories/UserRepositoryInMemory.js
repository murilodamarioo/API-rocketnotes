class UserRepositoryInMemory {
  users = [
    {
      user_id: 0,
      name: 'Billie Doe',
      email: 'billie@email.com',
      password: '123'
    },
    {
      user_id: 1,
      name: 'Jon Doe',
      email: 'jon@email.com',
      password: '123'
    }
  ]

  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name, 
      email,
      password
    }

    this.users.push(user)

    return user
  }

  async update(name, email, password, user_id) {
    const user = {
      user_id,
      name,
      email,
      password
    }

    const index = this.users.findIndex(user => user.user_id === user_id)

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user }
      return this.users[index]
    }

    return false
  }

  findByEmail(email) {
    return this.users.find(user => user.email === email)
  }

  findById(id) {
    return this.users.find(user => user.user_id === id)
  }
}

module.exports = UserRepositoryInMemory