import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import LeadsType from "./LeadTypeModel.js";

const LeadSource = db.define('lead_source', {
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
    type_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

LeadsType.hasMany(LeadSource);
LeadSource.belongsTo(LeadsType, {
    foreignKey: 'type_id'
});

export default LeadSource;