import { Context } from "../types/types"
import Post from "../model/post"
import { IP } from "../utils/utils"

export const getAllPost = async ({ res }: Context | any) => {
    try {
        const posts = await Post.find().limit(30)

        let filtered = []

        posts.map((item) => filtered.unshift(item.toJSON() as never))
        return res.status.json({
            ...posts,
        })
    } catch (error) {
        return res.status(404).json({
            msg: "No post found",
        })
    }
}

export const createPost = async ({ req, res }: Context) => {
    const body = req.body
    const file = req.file!.filename
    // console.log(body)

    const file_url = `http:${IP}:${process.env.PORT}/media/${file}`
    try {
        const post = new Post({
            uid: body.uid,
            body: body.body,
            post_type: body.post_type,
            file_url: file_url,
        }).populate("uid")
        await (await post).save()

        const result = (await post).toJSON()

        return res.status(200).json({
            ...result,
        })
    } catch (error) {

        return res.status(400).json({
            msg: "Failed to create post",
        })
    }
}

export const deletePost = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        await Post.findByIdAndDelete(id)
        return res.status(200).json({
            msg: "Post deleted",
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Failed to delete post",
        })
    }
}

export const likePost = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        let post = await Post.findOne({ _id: id })
        let likes = post!.likes
        if (!likes.includes(req.body.uid)) {
            likes.push(req.body.uid)
            post!.likes = likes
            await post!.save()

            return res.status(200).json({
                msg: "like added",
            })
        } else {
            post!.likes = post!.likes.filter((item) => item != req.body.uid)
            await post!.save()

            return res.status(401).json({
                msg: "like removed",
            })
        }
    } catch (error) {
        console.log(error)

        return res.status(400).json({
            msg: "Failed to add like",
        })
    }
}

export const commentPost = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        let post = await Post.findOne({ _id: id })
        let comments = post!.comments

        comments.push({ ...req.body })
        post!.comments = comments
        const result = await post!.save()
        const filtered = result.toJSON()

        return res.status(200).json({
            ...filtered,
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Failed to add comment",
        })
    }
}

export const getUserPost = async ({ req, res }: Context) => {
    const id = req.params.id
    try {
        const posts = await Post.find({ uid: id }).populate("uid")
        let filtered = []

        posts.map((item) => filtered.unshift(item.toJSON() as never))

        return res.status(200).json([...filtered])
    } catch (error) {
        return res.status(400).json({
            msg: "Failed to get user posts",
        })
    }
}