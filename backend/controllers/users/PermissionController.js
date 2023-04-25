import Permissions from '../../models/users/PermissionModel.js';

export const getPermission = async (req, res) => {
    try {
        const response = await Permissions.findAll({
            attributes: ['uuid', 'name', 'roleUuid'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getPermissionById = async (req, res) => {
    try {
        const response = await Permissions.findOne({
            where: {uuid: req.params.id},
            attributes: ['uuid', 'name', 'roleUuid'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createPermission = async (req, res) => {
    try {
        const response = await Permissions.create(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updatePermission = async (req, res) => {
    const permission = await Permissions.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!permission){
        return res.status(404).json({message: 'Permission Tidak di Temukan'});
    }
    try {
        const response = await Permissions.update(req.body, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'Permission Berhasil di Ubah'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const deletePermission = async (req, res) => {
    const permission = await Permissions.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!permission){
        return res.status(404).json({message: 'Permission Tidak di Temukan'});
    }
    try {
        const response = await Permissions.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: 'Permission Telah di Hapus'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}