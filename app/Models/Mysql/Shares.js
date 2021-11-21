/* jshint indent: 2 */

import {Model, Sequelize} from 'sequelize'

class Shares extends Model {
    static init(sequelize, DataTypes) {
        super.init({
            share_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                unique: "FK_shares_users"
            },
            link: {
                type: DataTypes.STRING(500),
                allowNull: false,
                defaultValue: ""
            },
            youtube_code: {
                type: DataTypes.STRING(20),
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
            tableName: 'shares',
            // schema: 'movies',
            timestamps: false,
            indexes: [
                {
                    name: "PRIMARY",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "share_id"},
                    ]
                },
                {
                    name: "FK_shares_users",
                    using: "BTREE",
                    fields: [
                        {name: "user_id"},
                    ]
                },
            ]
        });
        return Shares;
    }

    static associate = (models) => {
        Shares.belongsTo(models.Users, {foreignKey: 'user_id'})
    }
}

export default Shares
