import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import Post from "../model/post"

const baseapp = express()
const post_server = createServer(baseapp)
const io = new Server(post_server)

baseapp.get("/", (_req, res) => res.json({ msg: "hello" }))

io.on("connection", async (socket: any) => {
    let posts = []

    // ADD POST
    socket.on("create-post", (data: never) => {
        posts.unshift(data)
        io.emit("create-post", posts)
    })

    socket.on("get-posts", async () => {
        const data = await Post.find()
            .limit(30)
            .populate("uid")
            .populate("product")
        data.map((item) => posts.unshift(item.toJSON() as never))
        io.emit("get-posts", posts)
    })
})

post_server.listen(4001, () =>
    console.log(`POST SERVER @ http://localhost:4001`)
)