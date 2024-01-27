// importa as configurações presentes no knexfile
const config = require('../../../knexfile');

// importa o knex
const knex = require('knex');

// faz a conexão
const connection = knex(config.development);

module.exports = connection;