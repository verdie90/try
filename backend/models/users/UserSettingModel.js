import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Users from "./UsersModel.js";

const UserSettings = db.define('user_settings', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    language: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Users.hasMany(UserSettings);
UserSettings.belongsTo(Users, {
    foreignKey: 'user_id',
});

export default UserSettings;
