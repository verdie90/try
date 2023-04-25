import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import LeadsSource from "./LeadSourceModel.js";
import LeadsCategory from "./LeadCategoryModel.js";
import Users from "../users/UserModel.js";

const LeadsData = db.define('leads_data', {
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
    phone : {
        type: Sequelize.STRING,
        allowNull: false
    },
    email : {
        type: Sequelize.STRING,
        validate:{
            isEmail: true
        }
    },
    desc: {
        type: Sequelize.TEXT,
    },
    source_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

LeadsSource.hasMany(LeadsData);
LeadsCategory.hasMany(LeadsData);
Users.hasMany(LeadsData);

LeadsData.belongsTo(LeadsSource, {
    foreignKey: 'source_id'
});
LeadsData.belongsTo(LeadsCategory, {
    foreignKey: 'category_id'
});
LeadsData.belongsTo(Users, {
    foreignKey: 'user_id'
});

export default LeadsData;