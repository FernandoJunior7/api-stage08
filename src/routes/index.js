// importa a classe Router da biblioteca express. Só precisa da classe Router, ent n precisa importar
// tudo
const { Router } = require('express');

// importa as rotas de cada um desses arquivos (users,notes e tags)
const usersRoutes = require('./users.routes');
const notesRoutes = require('./notes.routes');
const tagsRoutes = require('./tags.routes');

// instancia a classe Router para usar os métodos dela
const routes = Router();

// "cadastra" as rotas de cada um dos arquivos importados anteriormente, juntando todas numa variável só
// pra ser mais fácil de importar nos outros arquivos
routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);
routes.use('/tags', tagsRoutes);

// exporta pra ser acessível de fora
module.exports = routes;