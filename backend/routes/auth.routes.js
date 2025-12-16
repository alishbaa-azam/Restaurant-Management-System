import express from 'express';
import { register, login, setupAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setup-admin', setupAdmin);

export default router;
