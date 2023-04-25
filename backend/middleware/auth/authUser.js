import Users from "../../models/users/UserModel.js";

export const verifyUser = async (req, res, next) => {
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
    req.userId = user.uuid;
    next();
}
