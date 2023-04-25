import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const LeadsCategory = db.define('leads_category', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default LeadsCategory;