// importa a conexão com o banco de dados
const sqliteConnection = require('../../sqlite');

// importa a criação da tabela de usuários
const createUsers = require('./createUsers');

async function migrationsRun() {
  // pega todas as tabelas e vai juntando elas utilizando o join sem nenhum espaço
  const schemas = [
    createUsers
  ].join('');

  console.log(schemas);

  // conecta com o banco de dados, depois executa a criação das tabelas e pega um possível erro
  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error));
}

module.exports = migrationsRun;