import bcrypt from 'bcrypt';

// cantidad de saltos
const SALT_ROUNDS : number = 10

// METODOS
// leer y crear hasheo de la contraseña--USARE EN authController
export const hashPassword = async (password:string): Promise<string> =>{
    return await bcrypt.hash(password, SALT_ROUNDS)
}

// leer y comparar la contraseña hasheada que ya esta en la BBDD
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash)
}
