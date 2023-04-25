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
    userUuid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Users,
            key: 'uuid'
        }
    },
    roleUuid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Roles,
            key: 'uuid'
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(RoleUsers);
Roles.hasMany(RoleUsers);
RoleUsers.belongsTo(Users, {foreignKey: 'userUuid'});
RoleUsers.belongsTo(Roles, {foreignKey: 'roleUuid'});

export default RoleUsers;