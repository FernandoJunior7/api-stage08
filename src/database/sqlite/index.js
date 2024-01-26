const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const path = require('path');

// __dirname é o nome do diretório atual

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
  });

  return database;
}

module.exports = sqliteConnection;