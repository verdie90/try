import Users from "../../models/users/UserModel.js";
import RoleUsers from "../../models/users/RoleUserModel.js"
import Roles from "../../models/users/RoleModel.js";
import Permissions from "../../models/users/PermissionModel.js";

export const verifyPermission = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({message: 'Akses Terlarang, Silahkan Login Terlebih Dahulu'});
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user){
        return res.status(404).json({message: 'User Tidak di Temukan'});
    }
    const roleUser = await RoleUsers.findOne({
        where: {
            user_id: user.uuid
        }
    });
    if(!roleUser){
        return res.status(404).json({message: 'Role Pada User Tidak di Temukan'});
    }
    const roles = await Roles.findOne({
        where: {
            uuid: roleUser.role_id
        }
    });
    if(!roles){
        return res.status(404).json({message: 'Role Tidak di Temukan'});
    }
    const permissions = await Permissions.findOne({
        where: {
            role_id: roles.uuid
        }
    });
    if(!permissions){
        return res.status(404).json({message: 'Permission Tidak di Temukan'});
    }
    if(permissions.uuid !== req.params.uuid){
        return res.status(403).json({message: 'Akses Terlarang, Silahkan Login Terlebih Dahulu'});
    }
    req.userId = user.uuid;
    next();
}
