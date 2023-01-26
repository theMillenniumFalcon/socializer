import { Router } from "express"
import {
    commentPost,
    createPost,
    deletePost,
    getAllPost,
    getUserPost,
    likePost,
} from "../controller/post"
import { upload2 } from "../middleware/photo-upload"
import { validateToken } from "../middleware/validate-token"

export const PostRoute = Router()

PostRoute.get("/", validateToken, getAllPost)
PostRoute.post("/", validateToken, upload2.single("post_file"), createPost)
PostRoute.delete("/:id", validateToken, deletePost)
PostRoute.post("/like/:id", validateToken, likePost)
PostRoute.post("/comment/:id", validateToken, commentPost)
PostRoute.get("/user/:id", validateToken, getUserPost)