const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Address = require("../models/Address");
const Event = require("../models/Event");
const Product = require("../models/Product");
const Buy = require("../models/Buy");

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Event.init(connection);
Product.init(connection);
Buy.init(connection);


Event.associate(connection.models);
Address.associate(connection.models);
User.associate(connection.models);
Product.associate(connection.models);
Buy.associate(connection.models);
module.exports = connection;
