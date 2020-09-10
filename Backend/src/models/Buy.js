const { Model, DataTypes } = require("sequelize");

class Buy extends Model {
    static init(sequelize) {
      super.init(
        {
          value: DataTypes.DOUBLE,
          amount_value: DataTypes.DOUBLE
        },
        { 
          sequelize,
          tableName: "buys",
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'ownerEvent' });
      this.belongsToMany(models.Product, { foreignKey: 'buy_id', through: 'buy_products', as: 'products' });
    } 
  }
  module.exports = Buy;
  