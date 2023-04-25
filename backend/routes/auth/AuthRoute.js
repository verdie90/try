import express from 'express';
import { login, logout, gue } from '../../controllers/auth/Auth.js';

const router = express.Router();

router.post('/login', login);
router.delete('/logout', logout);
router.get('/gue', gue);

export default router;