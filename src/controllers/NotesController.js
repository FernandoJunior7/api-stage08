const knex = require('../database/knex');

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    // insere na tabela nota, knex retorna o número do id das notas inseridas
    // precisa da variável pra salvar aas tags e links
    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id
    });

    // constrói um novo vetor em cima do antigo
    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    });

    // não precisa salvar o id do link, ent pula
    await knex('links').insert(linksInsert);

    //  mesma coisa que link, só que tag
    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    });

    await knex('tags').insert(tagsInsert);

    response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    // first pra prevenir o knex de retornar um array ao invés de um objeto apenas
    const note = await knex('notes').where({id}).first();
    // a comparação funciona desse jeito {coluna_na_tabela: valor_esperado }
    const tags = await knex('tags').where({note_id: id}).orderBy('name');
    const links = await knex('links').where({note_id: id}).orderBy('created_at');

    return response.json({
      // junta todo o conteúdo presente em note com tags e links
      ...note,
      tags,
      links
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex('notes').where({id}).delete();

    return response.json();
  }

  async index(request, response) {
    const { title, user_id, tags } = request.query; 

    let notes;

    if (tags) {
      // primeiro vai transformar as tags em vetor separando pela vírgula e depois tirar o 
      // espaço em branco do começo e do final da palavra
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('tags')
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title');

    } else {
    notes = await knex('notes')
    .where({user_id})
    .whereLike('title', `%${title}%`)
    .orderBy('title');
    }

    const userTags = await knex('tags').where({user_id});
    const notesWithTags = notes.map(note => {
    const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;