import { Model, Document, model, Schema } from "mongoose"
import { hash, compare } from "bcryptjs"

interface UserType extends Document {
    id: string
    username: string
    name: {
        first: string
        last: string
    }
    email: string
    password: string
    role: string
    date_of_birth?: string
    profile_picture?: string
    profile_banner?: string
    compareEmail(email: string): boolean
    comparePass(password: string): boolean
    compareUsername(username: string): boolean
}

interface UserModel extends Model<UserType> { }

const UserSchema = new Schema<UserType, UserModel, UserType>(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        name: {
            first: {
                type: String,
                trim: true,
                required: true,
            },
            last: {
                type: String,
                trim: true,
                required: true,
            },
        },
        email: {
            unique: true,
            type: String,
            trim: true,
            required: true,
        },
        role: {
            type: String,
            default: "USER",
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        date_of_birth: {
            type: String,
        },
        profile_banner: {
            type: String,
        },
        profile_picture: {
            type: String,
        },
    },
    { timestamps: true }
)

UserSchema.pre("save", async function () {
    const user = this
    const hashpass = await hash(user.password, 12)
    user.password = hashpass
})

UserSchema.methods.toJSON = function () {
    const data = this
    const user = data.toObject()

    user.id = user._id
    delete user._id
    delete user.__v
    delete user.password

    return user
}

UserSchema.methods.compareUsername = async function (username) {
    const user = await User.findOne({ username: username })
    if (user) {
        return true
    } else {
        return false
    }
}

UserSchema.methods.compareEmail = async function (email) {
    const user = await User.findOne({ email: email })
    if (user) {
        return true
    } else {
        return false
    }
}

UserSchema.methods.comparePass = async function (password) {
    return await compare(password, this.password)
}

const User = model<UserType, UserModel>("users", UserSchema)
export default User