import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository.js";



const emailTakenError = () => {
    const error = new Error('Email already in use')
    error.statusCode = 409
    return error               
}

export const createUserService = (repo= userRepository()) => {
    return {
        register: async ({ name, email, password }) => {
            if(!password | password.length<6) {
                const error = new Error("Password must be at least 6 characters")
                error.statusCode = 400
                throw error
            }
                const existingUser = await repo.findByEmail(email)
                if(existingUser) throw emailTakenError()
                
                const hashedPassword = await bcrypt.hash(password, 10)

                try {
                    const user = await repo.create({name, email, password: hashedPassword})
                    return {id: user._id, name: user.name, email: user.email, role: user.role}
                } catch (err) {
                    if(err.code === 11000) throw emailTakenError()
                        return err
                }
        }  

    }
}