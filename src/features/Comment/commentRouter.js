import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import CommentsControllers from './commentControllers.js';

const commentRouter = express.Router();

const commentsControllers = new CommentsControllers();

// + Create New comment

commentRouter.post('/:postId', authMiddleware, (req, res, next) => {
    commentsControllers.createNewCommentByPostIdController(req, res, next)
})


export default commentRouter;