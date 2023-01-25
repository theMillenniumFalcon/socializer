import { verify } from "jsonwebtoken"

export const validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token: undefined | string = authHeader && authHeader.split(" ")[1]
    if (token) {
        verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    msg: "Failed to authenticate",
                })
            } else {
                req.user = user
                next()
            }
        })
    } else {
        return res.status(401).json({
            msg: "Not authorized to use",
        })
    }
}