const knex = require("../database/knex")


class NoteRepository {

  async create({ user_id, title, description, links, tags }) {
    const [note_id] = await knex("notes").insert({ title, description, user_id })
    
    return note_id
  }

  async InsertLinks(links) {
    await knex("links").insert(links)
  }

  async insertTags(tags) {
    await knex("tags").insert(tags)
  }
} 

module.exports = NoteRepository