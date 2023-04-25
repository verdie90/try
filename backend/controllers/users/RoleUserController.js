import RoleUsers from "../../models/users/RoleUserModel.js";
import Users from "../../models/users/UserModel.js";
import Roles from "../../models/users/RoleModel.js";
import { Op } from "sequelize";

export const getRoleUser = async (req, res) => {
    try {
        const response = await RoleUsers.findAll({
            attributes: ['uuid', 'userUuid', 'roleUuid'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getRoleUserbyId = async (req, res) => {
    try {
        const response = await RoleUsers.findOne({
            attributes: ['uuid', 'userUuid', 'roleUuid'],
            where: {
                uuid : req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createRoleUser = async (req, res) => {
    const {userUuid, roleUuid} = req.body;
    try {
        const response = await RoleUsers.create({
            userUuid,
            roleUuid
        });
        res.status(201).json({message: 'Role User Berhasil Dibuat'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateRoleUser = async (req, res) => {
    const roleUser = await RoleUsers.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!roleUser){
        return res.status(404).json({message: 'Role User Tidak di Temukan'});
    }
    const {userUuid, roleUuid} = req.body;
    try {
        const response = await RoleUsers.update({
            userUuid,
            roleUuid
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'Role User Berhasil Diubah'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteRoleUser = async (req, res) => {
    const roleUser = await RoleUsers.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!roleUser){
        return res.status(404).json({message: 'Role User Tidak di Temukan'});
    }
    try {
        const response = await RoleUsers.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'Role User Berhasil Dihapus'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}