const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

route.get('/', homeController.index);

// Contatos
route.get('/contato/index', contatoController.index);
route.post('/contato/criar', contatoController.criar);

route.get('/contato/remove/:id', contatoController.remove);
route.get('/contato/index/:id', contatoController.editar);
route.post('/contato/update/:id', contatoController.update);

// Login / Cadastros
route.get('/login/index', loginController.index);
route.get('/login/registro', loginController.PagRegistro);
route.post('/login/register', loginController.register);
route.post('/login/logar', loginController.logar);
route.get('/login/logout', loginController.logout);

module.exports = route;