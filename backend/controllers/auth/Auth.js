import Users from '../../models/users/UserModel.js';
import argon2 from 'argon2';

export const login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email,
            username : req.body.username,
        }
    });
    if(!user){
        return res.status(404).json({message: 'User Tidak di Temukan'});
    }
    const match = await argon2.verify(user.password, req.body.password);
    if(!match){
        return res.status(400).json({message: 'Username atau Email atau Password Salah'});
    }
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const username = user.username;
    const email = user.email;
    res.status(200).json({uuid, username, email});
}

export const logout = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}

export const gue = (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({message: 'Anda harus login terlebih dahulu'});
    }
    const user = Users.findOne({
        attributes: ['uuid', 'username', 'email'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user){
        return res.status(404).json({message: 'User Tidak di Temukan'});
    }
    res.status(200).json(user);
}