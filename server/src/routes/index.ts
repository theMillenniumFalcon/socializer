import express from 'express'
import { AuthRouter } from './auth'
import { PostRoute } from './posts'

export const BaseRouter = express.Router()

BaseRouter.use('/auth', AuthRouter)
BaseRouter.use('/post', PostRoute)