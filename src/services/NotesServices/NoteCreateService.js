class NoteCreateService {
  constructor(noteRepository) {
    this.noteRepository = noteRepository
  }

  async execute({ user_id, title, description, links, tags }) {
    const note_id = await this.noteRepository.create({ user_id, title, description })

    const linksToInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })
    await this.noteRepository.InsertLinks(linksToInsert)

    const tagsToInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })
    await this.noteRepository.insertTags(tagsToInsert)
  }
}

module.exports = NoteCreateService