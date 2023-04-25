import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const {DataTypes} = Sequelize;

const Users = db.define('users',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            unique: true,
            len: [3, 100]
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status :{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        validate:{
            notEmpty: true,
            isBoolean: true
        }
    }
},{
    freezeTableName: true
});

export default Users;