import express from 'express';
import { getRole, getRolebyId, createRole, updateRole, deleteRole } from '../../controllers/users/RoleController.js';

const router = express.Router();

router.get('/roles', getRole);
router.get('/roles/:id', getRolebyId);
router.post('/roles', createRole);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

export default router;
