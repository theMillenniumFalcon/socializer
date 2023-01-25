import { sign } from "jsonwebtoken"
import User from "../model/user"

export const signUpUser = async (req, res) => {
    const body = req.body
    try {
        const user = new User({
            ...body,
        })
        const emailInUse = user.compareEmail(user.email)
        const usernameInUse = user.compareUsername(user.username)
        if (emailInUse || usernameInUse) {
            return res.status(401).json({
                msg: "Email or username Already in use",
            })
        } else {
            await user.save()
            const result = user.toJSON()
            const token = sign(result, process.env.JWT_SECRET, {
                expiresIn: "7d",
            })

            return res.status(200).json({
                token: "Bearer " + token,
                user: { ...result },
            })
        }
    } catch (error) {
        return res.status(401).json({
            msg: "Error while sigining up",
        })
    }
}

const findByEamailOrUsername = async (data: string) => {
    const userByEmail = await User.findOne({ email: data })
    const userByUsername = await User.findOne({ username: data })
    if (userByEmail) {
        return userByEmail
    } else if (userByUsername) {
        return userByUsername
    } else {
        return null
    }
}

export const signInUser = async (req, res) => {
    try {
        const { identifier, password } = req.body
        const user = await findByEamailOrUsername(identifier)
        if (user) {
            const validpass = await user.comparePass(password)
            if (validpass) {
                const result = user.toJSON()
                const token = sign(result, process.env.JWT_SECRET, { expiresIn: "7d" })
                return res.status(200).json({
                    token: "Bearer " + token,
                    user: { ...result },
                })
            } else {
                return res.status(403).json({
                    msg: "Wrong password",
                })
            }
        } else {
            return res.status(404).json({
                msg: "Worng email or password",
            })
        }
    } catch (error) {
        return res.status(401).json({
            msg: "Error while sigining in",
        })
    }
}

export const getAllUser = async (_req, res) => {
    try {
        const users = await User.find()
        let filter = []
        users.map((item) => {
            if (item.role == "USER") {
                filter.push(item.toJSON() as never)
            }
        })

        return res.status(200).json({
            ...filter,
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Failed To get users",
        })
    }
}

export const validateUsername = async (req, res) => {
    try {
        const username = req.params.username

        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(200).json({
                userExist: true,
            })
        } else {
            return res.status(200).json({
                userExist: false,
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: "failed to make request",
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const data = req.body
        const id = req.params.id

        await User.findOneAndUpdate({ _id: id }, { ...data })
        const result = await User.findOne({ _id: id })

        const updated = result!.toJSON()

        return res.status(200).json({
            ...updated,
        })
    } catch (error) {
        return res.status(400).json({
            msg: "failed to make request",
        })
    }
}
