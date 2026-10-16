import bcrypt from "bcrypt";
import { authRepository } from "../repositories/authRepository.js";
import jwt from "jsonwebtoken";


const emailTakenError = () => {
    const error = new Error('Email already in use')
    error.statusCode = 409
    return error
}

const invalidCredentialsError = () => {
    const error = new Error("Invalid email or password")
    error.statusCode = 401
    return error
}

const generateToken = (user) => jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
)

export const createAuthService = (repo = authRepository()) => {
    return {
        register: async ({ name, email, password }) => {
            if (!password || password.length < 6) {
                const error = new Error("Password must be at least 6 characters")
                error.statusCode = 400
                throw error
            }
            const existingUser = await repo.findByEmail(email)
            if (existingUser) throw emailTakenError()

            const hashedPassword = await bcrypt.hash(password, 10)

            try {
                const user = await repo.create({ name, email, password: hashedPassword })
                const token = generateToken(user)
                return {
                    token,
                    user: { id: user._id, name: user.name, email: user.email, role: user.role }
                }
            } catch (err) {
                if (err.code === 11000) throw emailTakenError()
                throw err
            }
        },

        login: async ({ email, password }) => {
            if (!email || !password) {
                const error = new Error("email and password are required")
                error.statusCode = 400
                throw error
            }

            const user = await repo.findByEmailWithPassword(email)
            if (!user) throw invalidCredentialsError()

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) throw invalidCredentialsError()

            const token = generateToken(user)
            return {
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
            }
        }

    }
}