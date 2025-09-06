import express from 'express'
import { register, login, me } from '../controllers/userController';

const userRouter = express.Router()
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/me', me)

export default userRouter;