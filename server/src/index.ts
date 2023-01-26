import 'dotenv-safe/config'
import express from "express"
import cors from "cors"
import path from 'path'

import { BaseRouter } from "./routes"
import { connectDB } from "./database/database-connection"

const PORT = parseInt(process.env.PORT) || 4000

const main = async () => {
    await connectDB()

    const app = express()

    app.set("trust proxy", 1)

    app.use(cors())

    app.use(express.json())

    app.get('/', (_req, res) => {
        res.send("Server is working fine!")
    })

    app.use('/media', express.static(path.join(__dirname, 'media')))
    app.use("/", BaseRouter)

    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
    process.on('unhandledRejection', (err, _) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })

    require('./post-server/post-server')
}
main().catch((error) => {
    console.error(error)
})