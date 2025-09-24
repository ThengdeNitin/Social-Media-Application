import express from 'express'
import { register, login, me } from '../controllers/userController.js';
import protect from '../middlewares/auth.js';
import upload from '../middlewares/multer.js';
import { forgotPassword } from "../controllers/userController.js";

const userRouter = express.Router()
userRouter.post('/register', upload.single('image'), register)
userRouter.post('/login', login)
userRouter.get('/me', protect, me)

userRouter.post("/forgot-password", forgotPassword);


export default userRouter;