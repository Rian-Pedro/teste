import 'core-js/stable';

import './assets/css/style.css';

import Login from './modules/Login';

const login = new Login('.form-login');
login.init();

import Cont from './modules/criarCont';

const cria = new Cont('.form-contato');
cria.init();