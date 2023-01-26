import express from 'express'
import { AuthRouter } from './auth'
import { PostRoute } from './post'
import { ProductRouter } from './product'

export const BaseRouter = express.Router()

BaseRouter.use('/auth', AuthRouter)
BaseRouter.use('/post', PostRoute)
BaseRouter.use('/product', ProductRouter)