import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import CommentsControllers from './commentControllers.js';

const commentRouter = express.Router();

const commentsControllers = new CommentsControllers();

// + Create New comment

commentRouter.post('/:postId', authMiddleware, (req, res, next) => {
    commentsControllers.createNewCommentByPostIdController(req, res, next)
});

// @ GET Commewnt by id
commentRouter.get('/:postId', (req, res, next) => {
    commentsControllers.getCommentByPostIdController(req, res, next)
});

// * Update Comment By Id

commentRouter.put('/:commentId', authMiddleware, (req, res, next) => {
    commentsControllers.updateCommentByCommentIdController(req, res, next)
})

// - Delete Comment By Id

commentRouter.delete('/:commentId', authMiddleware, (req, res, next) => {
    commentsControllers.deleteCommentByCommentIdController(req, res, next)
})


export default commentRouter;