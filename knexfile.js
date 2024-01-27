const path = require('path');

module.exports = {
  // nome da conexão
  development: {
    // informa o banco de dados
    client: 'sqlite3',
    // qual o arquivo que está/ficará o banco de dados
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db')
    },
    // não entendi muito bem, algo relacionado a permitir que as remoções em cascata ocorram
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    // onde esta as migrations
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    // permite que se não informado o valor, por padrão será null
    useNullAsDefault: true,
  }
};
