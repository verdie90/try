import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const LeadsType = db.define('leads_type', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

export default LeadsType;