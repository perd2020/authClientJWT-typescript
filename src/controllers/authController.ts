import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from '../models/user'
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {
        // menajo de errores
        if (!email) {
            res.status(400).json({ message: 'El email es obligatorio' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'El password es obligatorio' })
            return
        }
        // contrasenha hasheada
        const hashedPassword = await hashPassword(password)

        const user = await prisma.create(
            {
                data: {
                    email,
                    password: hashedPassword
                }
            }
        )

        const token = generateToken(user)
        res.status(201).json({ token })

    } catch (error: any) {
        // errore duplicado, propios de prisma si el mail ya fue registrado
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: 'El mail ingresado ya existe' })
        }
        // fin error mail duplicado

        console.log(error)
        res.status(500).json({ error: 'Hubo un error en el registro' })

    }

}

// login de usuarios
export const login = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body

    try {

        if (!email) {
            res.status(400).json({ message: 'El email es obligatorio' })
            return
        }
        if (!password) {
            res.status(400).json({ message: 'El password es obligatorio' })
            return
        }

        // buscador de ususario where filtra por email=email
        const user = await prisma.findUnique({ where: { email } })
        if (!user) {
            // si no encuentra/coincide el usuario ingresado
            res.status(404).json({ error: 'Usuario no encontrado' })
            return
        }

        // passwordMatch es el comparador de contraseñas devuelve true/false
        const passwordMatch = await comparePasswords(password, user.password);
        // manejo si es false -si no coincide la contraseña ingresada
        if (!passwordMatch) {
            
            res.status(401).json({ error: 'Usuario y contraseñas no coinciden' })
        }

        const token = generateToken(user)
        res.status(200).json({ token })


    } catch (error: any) {
        console.log('Error: ', error)
    }

}




