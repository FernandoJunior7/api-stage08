// importa a Router
const { Router } = require('express');

// importa o controller das notes
const NotesController = require('../controllers/NotesController');

// inicializa o Router
const notesRoutes = Router();

// inicializa o controller das notes
const notesController = new NotesController();

// cria as rotas com os métodos desejados (path + função esperada dentro do controller)
notesRoutes.get('/', notesController.index);
notesRoutes.post('/:user_id', notesController.create);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes;