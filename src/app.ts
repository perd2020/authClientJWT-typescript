import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes'
import usersRoutes from './routes/userRoutes'

const app =express();

app.use(express.json());

// ROUTES-ENDPOINTS:
// autenticacion-logearse
app.use('/auth', authRoutes)

// user-listado de usuarios--API REST DE USUARIOS
app.use('/users', usersRoutes)

export default app

