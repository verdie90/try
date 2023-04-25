import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Users from "./UserModel.js";
import Roles from "./RoleModel.js";

const {DataTypes} = Sequelize;

const RoleUsers = db.define('role_users',{
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
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Roles,
            key: 'id'
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(RoleUsers);
Roles.hasMany(RoleUsers);
RoleUsers.belongsTo(Users, {foreignKey: 'user_id'});
RoleUsers.belongsTo(Roles, {foreignKey: 'role_id'});

export default RoleUsers;