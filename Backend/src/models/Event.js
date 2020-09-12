const { Model, DataTypes } = require("sequelize");

class Event extends Model {
    static init(sequelize) {
      super.init(
        {
          name: DataTypes.STRING,
          description: DataTypes.STRING,
          date: DataTypes.DATE,
          start_time: DataTypes.DATE,
          finish_time: DataTypes.DATE,
          amount: DataTypes.INTEGER,
          amount_sales: DataTypes.INTEGER,
        },
        { 
          sequelize,
          tableName: "events",
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'ownerEvent' });
      this.belongsTo(models.Address, { foreignKey: 'address_id', as: 'address' });
      this.hasMany(models.Product, { foreignKey: 'event_id', as: 'hasProducts' });
    }
    
  }
    
  module.exports = Event;
  