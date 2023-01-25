import express from "express"
import {
    getAllUser,
    signInUser,
    signUpUser,
    updateUser,
    validateUsername,
} from "../controller/auth"
import { validateToken } from "../middleware/validate-token"

export const AuthRouter = express.Router()

AuthRouter.get("/", validateToken, getAllUser)
AuthRouter.post("/signin", signInUser)
AuthRouter.post("/signup", signUpUser)
AuthRouter.get("/validate-username/:username", validateUsername)
AuthRouter.post("/update/:id", validateToken, updateUser)