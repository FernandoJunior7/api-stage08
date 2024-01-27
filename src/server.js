// IMPORTAÇÃO 

// importa a biblioteca que gerencia os erros
require('express-async-errors');

// importa a função migrations run
const migrationsRun = require('./database/sqlite/migrations');

// importa a classe AppError
const AppError = require('./utils/AppError');

// importa a biblioteca express pras rotas
const express = require('express');

// importa as rotas
const routes = require('./routes');

// executa a função importada da migrations (cria a tabela users, caso ela não exista)
migrationsRun();

// inicaliza a biblioteca express na variável app (tornando app uma instância do express)
const app = express();

// informa o formato que será utilizado na comunicação http
app.use(express.json());

// informa quais rotas serão utilizadas
app.use(routes);

// define como o erro deve ser gerenciado (é necessário os 4 parâmetros, mesmo que eles não sejam utilizados)
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

// define a porta e fica ouvindo ela para que a aplicação possa ser executada
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));