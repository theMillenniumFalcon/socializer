import { Router } from "express"
import {
    createProduct,
    deleteProduct,
    getProductById,
    getUserProduct,
    updateProduct,
} from "../controller/product"
import { upload } from "../middleware/photo-upload"
import { validateToken } from "../middleware/validate-token"

export const ProductRouter = Router()

ProductRouter.get("/", validateToken, getUserProduct)
ProductRouter.get("/:id", validateToken, getProductById)
ProductRouter.post("/", validateToken, upload.single("image_url"), createProduct)
ProductRouter.put("/:id", validateToken, upload.single("image_url"), updateProduct)
ProductRouter.delete("/:id", validateToken, deleteProduct)