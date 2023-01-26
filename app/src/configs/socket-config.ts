import { io } from 'socket.io-client'
import { POST_SERVER } from './constants'

export const socket = io(POST_SERVER, {
    reconnectionAttempts: 15,
})