const express = require('express');

const UserController = require('./Controllers/UserController');
const AddressController = require('./Controllers/AddressController');
const EventController = require('./Controllers/EventController');
const ProductController = require('./Controllers/ProductController');
const BuyController = require('./Controllers/BuyController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.get('/users/:user_id', UserController.index);
routes.get('/user/:email', UserController.email);

routes.post('/signin', SessionController.store);
routes.get('/address/:address_id', AddressController.index);

routes.post('/users/:user_id/events', EventController.store);
routes.get('/users/:user_id/events', EventController.index);
routes.get('/events', EventController.indexAll);


routes.get('/events/:event_id/products', ProductController.index);
routes.post('/events/:event_id/products', ProductController.store);

routes.post('/users/:user_id/buys', BuyController.store);
routes.get('/users/:user_id/buys', BuyController.index);
module.exports = routes;