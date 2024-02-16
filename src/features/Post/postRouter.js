import express from 'express';
import upload from "../../middlewares/fileUploadMiddleware.js";
import authMiddleware from '../../middlewares/authMiddleware.js';
import PostControllers from './postControllers.js';
import { postValidation, } from '../../middlewares/expressValidation.js';

const postRouter = express.Router();

const postControllers = new PostControllers();

// + Create New Post

postRouter.post('/', upload, postValidation, authMiddleware, (req, res, next) => {
    postControllers.createNewPostController(req, res, next);
});

// @ GET All Post

postRouter.get('/all', (req, res, next) => {
    postControllers.getAllPostController(req, res, next);
})

// @ GET All Post From Secific User

postRouter.get('/', authMiddleware, (req, res, next) => {
    postControllers.getPostByUserController(req, res, next)
});

// @ GET Post By PostId

postRouter.get('/:postId', (req, res, next) => {
    postControllers.getPostByPostIdController(req, res, next)
})



export default postRouter;
