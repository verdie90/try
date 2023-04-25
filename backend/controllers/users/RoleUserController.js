import RoleUsers from "../../models/users/RoleUserModel.js";
import Users from "../../models/users/UserModel.js";
import Roles from "../../models/users/RoleModel";
import { Op } from "sequelize";

export const getRoleUser = async (req, res) => {
    try {
        const response = await RoleUsers.findAll({
            attributes: ['userId', 'roleId'],
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getRoleUserbyId = async (req, res) => {
    try {
        const response = await RoleUsers.findOne({
            attributes: ['userId', 'roleId'],
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createRoleUser = async (req, res) => {
    const {userId, roleId} = req.body;
    try {
        const response = await RoleUsers.create({
            userId,
            roleId
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
            userId: req.params.id
        }
    });
    if(!roleUser){
        return res.status(404).json({message: 'Role User Tidak di Temukan'});
    }
    const {userId, roleId} = req.body;
    try {
        const response = await RoleUsers.update({
            userId,
            roleId
        }, {
            where: {
                userId: req.params.id
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
            userId: req.params.id
        }
    });
    if(!roleUser){
        return res.status(404).json({message: 'Role User Tidak di Temukan'});
    }
    try {
        const response = await RoleUsers.destroy({
            where: {
                userId: req.params.id
            }
        });
        res.status(200).json({message: 'Role User Berhasil Dihapus'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}