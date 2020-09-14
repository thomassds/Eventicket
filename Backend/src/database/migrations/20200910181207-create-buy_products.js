'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("buy_products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      buy_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'buys', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount_buy:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      status:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("buy_products");
  }
};
