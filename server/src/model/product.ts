import { Document, Model, Schema, model } from 'mongoose'

interface ProductType extends Document {
    id: string
    name: string
    description: string
    price: number
    uid: string
    image_url: string
}

interface ProductModel extends Model<ProductType> { }

const ProductSchema = new Schema<ProductType, ProductModel, ProductType>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

    },
    { timestamps: true }
)

ProductSchema.methods.toJSON = function () {
    const data = this
    const product = data.toObject()

    product.id = product._id
    delete product._id
    delete product.__v

    return product
}

const Product = model<ProductType, ProductModel>('product', ProductSchema)

export default Product