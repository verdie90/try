import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Roles from "./RoleModel.js";

const {DataTypes} = Sequelize;

const Permissions = db.define('permissions',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    roleUuid : {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Roles.hasMany(Permissions);
Permissions.belongsTo(Roles, {foreignKey: 'roleUuid'});

export default Permissions;