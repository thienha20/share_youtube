/* jshint indent: 2 */

import { Model, Sequelize } from 'sequelize'

class Users extends Model {
  static init(sequelize, DataTypes) {
    super.init({
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "",
        unique: "email"
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ""
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize,
      tableName: 'users',
      // schema: 'movies',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "email" },
          ]
        },
      ]
    });
    return Users;
  }

  static associate = (models) => {
    Users.hasMany(models.Shares, {foreignKey: 'user_id'})
  }
}

export default Users