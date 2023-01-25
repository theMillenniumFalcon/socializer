import 'dotenv-safe/config'
import express from "express"
import cors from "cors"

const PORT = process.env.PORT

const main = async () => {
    const app = express()

    app.set("trust proxy", 1)

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))

    app.use(express.json())

    app.get('/', (_req, res) => {
        res.send("Server is working fine!")
    })

    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`)
    })
    process.on('unhandledRejection', (err, _) => {
        console.log(`Logged Error: ${err}`)
        server.close(() => process.exit(1))
    })
}
main().catch((error) => {
    console.error(error)
})