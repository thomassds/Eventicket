const { Model, DataTypes } = require("sequelize");

class Product extends Model {
    static init(sequelize) {
      super.init(
        {
          description: DataTypes.STRING,
          amount: DataTypes.INTEGER,
          amount_sales: DataTypes.INTEGER,
          value: DataTypes.DOUBLE
        },
        { 
          sequelize,
          tableName: "products",
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'ownerEvent' });
      this.belongsToMany(models.Buy, { foreignKey: 'product_id', through: 'buy_products', as: 'buys' });
    }
    
  }
    
  module.exports = Product;
  