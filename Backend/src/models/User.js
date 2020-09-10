const { Model, DataTypes } = require("sequelize");

const bcrypt = require("bcryptjs");
class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        phone: DataTypes.STRING,
        type: DataTypes.BOOLEAN
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
        },
      }
    );
  }
  
  static associate(models) {
    this.hasMany(models.Event, { foreignKey: 'user_id', as: 'events' });
    this.hasMany(models.Buy, { foreignKey: 'user_id', as: 'buys' });

  }
  
}
  User.prototype.checkPassword = function(password){

    return bcrypt.compare(password, this.password_hash)

  }
  
module.exports = User;
