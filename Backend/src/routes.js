const express = require('express');
const UserController = require('./Controllers/UserController');


const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users/:id_user', UserController.index);
module.exports = routes;