import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Users from "./UserModel.js";

const UserActivitys = db.define('user_activitys', {
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
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Users.hasMany(UserActivitys);
UserActivitys.belongsTo(Users, {
    foreignKey: 'user_id'
});

export default UserActivitys;