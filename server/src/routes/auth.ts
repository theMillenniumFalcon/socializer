import express from "express"
import {
    getAllUser,
    signInUser,
    signUpUser,
    updateUser,
    validateUsername,
    uploadBanner,
    uploadDP,
} from "../controller/auth"
import { validateToken } from "../middleware/validate-token"
import { upload } from "../middleware/photo-upload"

export const AuthRouter = express.Router()

AuthRouter.get("/", validateToken, getAllUser)
AuthRouter.post("/signin", signInUser)
AuthRouter.post("/signup", signUpUser)
AuthRouter.get("/validate-username/:username", validateUsername)
AuthRouter.post("/update/:id", validateToken, updateUser)
AuthRouter.post('/upload/dp/:id', validateToken, upload.single('dp'), uploadDP)
AuthRouter.post('/upload/banner/:id', validateToken, upload.single('banner'), uploadBanner)