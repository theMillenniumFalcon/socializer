import Product from "../model/product"
import { IP } from "../utils/ip"
import { Context } from '../types/types'

export const getUserProduct = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        const products = await Product.find({ uid: id })
        if (products) {
            let filtered = []
            products.map((item) => filtered.unshift(item.toJSON() as never))

            return res.status(200).json([...filtered])
        } else {
            return res.status(404).json({
                msg: "No Product Found",
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: "failed to get products",
        })
    }
}

export const getProductById = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ _id: id })
        if (product) {
            let filtered = product.toJSON()
            return res.status(200).json({ ...filtered })
        } else {
            return res.status(404).json({
                msg: "No Product Found",
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: "failed to get product",
        })
    }
}

export const createProduct = async ({ req, res }: Context) => {
    const body = req.body
    const file = req.file!.filename

    const file_url = `http:${IP}:${process.env.PORT}/media/${file}`

    try {
        const product = new Product({
            uid: body.uid,
            description: body.description,
            name: body.name,
            price: body.price,
            image_url: file_url,
        })
        await product.save()
        const result = product.toJSON()
        return res.status(200).json({ ...result })
    } catch (error) {
        return res.status(400).json({
            msg: "Failed to create product",
        })
    }
}

export const updateProduct = async ({ req, res }: Context) => {
    const body = req.body
    const file = req.file
    const id = req.params.id

    if (file) {
        const image_url = `http:${IP}:${process.env.PORT}/media/${file.filename}`
        try {
            const product = await Product.findOneAndUpdate(
                { _id: id },
                { ...body, image_url: image_url }
            )
            const result = product!.toJSON()
            return res.status(200).json({
                ...result,
            })
        } catch (error) {
            return res.status(400).json({
                msg: "failed to update product",
            })
        }
    } else {
        try {
            const product = await Product.findOneAndUpdate({ _id: id }, { ...body })
            const result = product!.toJSON()
            return res.status(200).json({
                ...result,
            })
        } catch (error) {
            return res.status(400).json({
                msg: "failed to update product",
            })
        }
    }
}

export const deleteProduct = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        await Product.findOneAndDelete({ _id: id })
        return res.status(200).json({
            msg: "product deleted",
        })
    } catch (error) {
        return res.status(400).json({
            msg: "failed to delete product",
        })
    }
}