import Roles from '../../models/users/RoleModel.js';

export const getRole = async (req, res) => {
    try {
        const response = await Roles.findAll({
            attributes: ['uuid', 'name'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getRolebyId = async (req, res) => {
    try {
        const response = await Roles.findOne({
            attributes: ['uuid', 'name'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createRole = async (req, res) => {
    const {name} = req.body;
    try {
        const response = await Roles.create({
            name: name,
        });
        res.status(201).json({message: 'Role Berhasil Dibuat'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateRole = async (req, res) => {
    const role = await Roles.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!role){
        return res.status(404).json({message: 'Role Tidak di Temukan'});
    }
    const {name} = req.body;
    try {
        const response = await Roles.update({
            name
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'Role Berhasil Diubah'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deleteRole = async (req, res) => {
    const role = await Roles.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!role){
        return res.status(404).json({message: 'Role Tidak di Temukan'});
    }
    try {
        const response = await Roles.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'Role Berhasil Dihapus'});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}