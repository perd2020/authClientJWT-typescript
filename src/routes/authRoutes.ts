import express from 'express';
import { login, register } from '../controllers/authController';

const router = express.Router();

// registro nuevo usuario
router.post('/register', register);

// login que compara si ya esta creado ese usuario
router.post('/login', login);


export default router;