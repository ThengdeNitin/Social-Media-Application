import express from 'express'
import protect from '../middlewares/auth.js'
import upload from '../middlewares/multer.js'
import { getPostById } from '../controllers/postController.js';

import { addComment, createPost, deletePost, getPost, getPostsByUser, toggleLike, updatePost } from '../controllers/postController.js'

const postRouter = express.Router()

postRouter.post('/create', protect, upload.single('image'), createPost);
postRouter.get('/get-posts', getPost);
postRouter.get('/posts/:id', getPostById);
postRouter.get('/user-posts', protect, getPostsByUser);
postRouter.put('/posts/:id', protect, upload.single('image'), updatePost);
postRouter.delete('/posts/:id', protect, deletePost);
postRouter.put('/posts/:id/like', protect, toggleLike);
postRouter.post('/posts/:id/comment', protect, addComment);

export default postRouter;
