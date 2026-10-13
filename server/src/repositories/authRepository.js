import { User } from "../models/userModel.js"

export const authRepository = () => {
    return {
        create: async (userData) => {
            const user = await User.create(userData)
            return user
        },
        findByEmail: async (email) => {
            const userWithoutPassword = await User.findOne({email})
            return userWithoutPassword
        },
        findByEmailWithPassword: async (email) => {
            const userWithPassword = await User.findOne({email}).select('+password')
            return userWithPassword
        }
    }
}