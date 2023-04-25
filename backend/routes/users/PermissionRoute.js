import express from 'express';
import { getPermission, getPermissionById, createPermission, updatePermission, deletePermission } from '../../controllers/users/PermissionController.js';

const router = express.Router();

router.get('/permissions', getPermission);
router.get('/permissions/:id', getPermissionById);
router.post('/permissions', createPermission);
router.put('/permissions/:id', updatePermission);
router.delete('/permissions/:id', deletePermission);

export default router;