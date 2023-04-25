import Users from '../../models/users/UserModel.js';
import Permissions from '../../models/users/PermissionModel.js';
import RoleUsers from '../../models/users/RoleUserModel.js';
import Roles from '../../models/users/RoleModel.js';
import argon2 from 'argon2';
import { and } from 'sequelize';

export const login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user){
        return res.status(404).json({message: 'User Tidak di Temukan'});
    }
    // const roleUser = await RoleUsers.findOne({
    //     where: {
    //         user_id: user.uuid
    //     }
    // });
    // if(!roleUser){
    //     return res.status(404).json({message: 'Role Pada User Tidak di Temukan'});
    // }
    // const roles = await Roles.findOne({
    //     where: {
    //         uuid: roleUser.role_id
    //     }
    // });
    // if(!roles){
    //     return res.status(404).json({message: 'Role Tidak di Temukan'});
    // }
    // const permissions = await Permissions.findOne({
    //     where: {
    //         role_id: roles.uuid
    //     }
    // });
    // if(!permissions){
    //     return res.status(404).json({message: 'Permission Tidak di Temukan'});
    // }
    const match = await argon2.verify(user.password, req.body.password);
    if(!match){
        return res.status(400).json({message: 'Username atau Email atau Password Salah'});
    }
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const username = user.username;
    const email = user.email;
    // const role = roles.name;
    // const permission = permissions.name;
    res.status(200).json({uuid, username, email});
}

export const logout = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({message: "Tidak dapat logout"});
        res.status(200).json({message: "Anda telah logout"});
    });
}

export const gue = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({message: 'Anda harus login terlebih dahulu'});
    }
    const user = await Users.findOne({
        attributes: ['uuid', 'username', 'email', 'status'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({message: 'User Tidak di Temukan'});
    res.status(200).json(user);
}