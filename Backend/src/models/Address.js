const { Model, DataTypes } = require("sequelize");

class Address extends Model {
    static init(sequelize) {
      super.init(
        {
          zip_code: DataTypes.STRING,
          state: DataTypes.STRING,
          city: DataTypes.STRING,
          neighborhood: DataTypes.STRING,
          street: DataTypes.STRING,
          complement: DataTypes.STRING,
          number: DataTypes.STRING
        },
        {
          sequelize,
          tableName: "adresses",
        }
      );
    }
    static associate(models) {
      this.hasMany(models.Event, { foreignKey: 'address_id', as: 'events' });
    }
  }
    
  module.exports = Address;
  