const { hash, compare} = require('bcryptjs');

const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class UsersController {
 async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();

    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if(checkUserExists) {
      throw new AppError('Este e-mail já está em uso');
    }

    const hashedPassword = await hash(password, 8);

    await database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return response.status(201).json();
  }

  async update(request, responnse) {
    const {name, email, password, old_password } = request.body;
    const {id} = request.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)', [email]);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está em uso');
    }

    user.name = name ?? user.name;
    user.mail = mail ?? user.mail;

    if (password && !old_password) {
      throw new AppError('Você precisa informar sua senha atual para poder definir uma nova senha');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha não confere');
      }

      user.password = await has(password, 8);
    }

    await databse.run(`
      UPDATE users SET
      name = ?,
      updated_at = DATETIME('NOW'),
      WHERE id = ?`, [user.name, user.mail, user.password, id]
    );
    
    return response.status(200).json();
  }
}

module.exports = UsersController;