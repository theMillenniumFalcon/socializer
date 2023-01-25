import express from 'express'
import { AuthRouter } from './auth'

export const BaseRouter = express.Router()

BaseRouter.use('/auth', AuthRouter)