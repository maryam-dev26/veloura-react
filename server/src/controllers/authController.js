import { createAuthService } from "../services/authService.js";

export const createAuthController = (service = createAuthService()) => {
    return {
        signup: async (req, res) => {
            try {
                const { name, email, password } = req.body
                const { token, user } = await service.register({ name, email, password })
                res.status(201).json({ token, user })
            } catch (err) {
                const status = err.statusCode || 500
                const message = err.statusCode ? err.message : "something went wrong"
                res.status(status).json({ message })
            }
        },

        login: async (req, res) => {
            try {
                const { email, password } = req.body
                const { token, user } = await service.login({ email, password })
                res.status(200).json({ token, user })
            } catch (err) {
                const status = err.statusCode || 500
                const message = err.statusCode ? err.message : "Something went wrong"
                res.status(status).json({ message })
            }
        }
    }
}