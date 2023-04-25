import express from 'express';
import { getRoleUser, getRoleUserbyId, createRoleUser, updateRoleUser, deleteRoleUser } from '../../controllers/users/RoleUserController.js';

const router = express.Router();

router.get('/roleusers', getRoleUser);
router.get('/roleusers/:id', getRoleUserbyId);
router.post('/roleusers', createRoleUser);
router.put('/roleusers/:id', updateRoleUser);
router.delete('/roleusers/:id', deleteRoleUser);

export default router;
