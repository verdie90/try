import { Sequelize } from "sequelize";
import db from "../../config/Database.js";
import Companys from "../company/CompanyModel.js";
import Users from "./UserModel.js";

const UserProfiles = db.define('user_profiles', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Companys,
            key: 'id'
        }
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING
    },
    images: {
        type: Sequelize.STRING,
    },
    phone: {
       type: Sequelize.STRING, 
    },
    address: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    }
});

Users.hasMany(UserProfiles);
UserProfiles.belongsTo(Users, {
    foreignKey: 'user_id',
});
Companys.hasMany(UserProfiles);
UserProfiles.belongsTo(Companys, {
    foreignKey: 'company_id',
});

export default UserProfiles;