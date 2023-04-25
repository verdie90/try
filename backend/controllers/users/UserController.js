import Users from '../../models/users/UserModel.js';
import argon2 from 'argon2';

export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'username', 'email'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserbyId = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'username', 'email'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createUser = async (req, res) => {
    const {username, email, password, confPassword} = req.body;
    if(password !== confPassword){
        return res.status(400).json({message: 'Password Tidak Sama'});
    }
    const hashPassword = await argon2.hash(password);
    try {
        const response = await Users.create({
            username,
            email,
            password: hashPassword
        });
        res.status(201).json({message: 'User Berhasil Dibuat'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user){
        return res.status(404).json({message: 'User Tidak di Temukan'});
    }
    const {username, email, password, confPassword} = req.body;
    let hashPassword;
    if(password === ''|| password === null){
        hashPassword = user.password;
    }
    else if(password !== confPassword){
        return res.status(400).json({message: 'Password Tidak Sama'});
    }
    else{
        hashPassword = await argon2.hash(password);
    }
    try {
        const response = await Users.update({
            username,
            email,
            password: hashPassword
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'User Berhasil Diubah'});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user){
        return res.status(404).json({message: 'User Tidak di Temukan'});
    }
    try {
        const response = await Users.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'User Berhasil Dihapus'});
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
}