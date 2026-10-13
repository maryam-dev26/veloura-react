import express from "express"
import { createAuthController } from "../controllers/authController.js"


const router = express.Router()
const authController = createAuthController()

router.post("/signup", authController.signup)
router.post("/login", authController.login)

export default router