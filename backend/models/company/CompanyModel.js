import { Sequelize } from "sequelize";
import db from "../../config/Database.js";

const Companys = db.define('companys', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bank: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    account: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name_account: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    website: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

export default Companys;