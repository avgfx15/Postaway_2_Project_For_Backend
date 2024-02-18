import express from 'express';
import LikesControllers from './likeControllers.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

const likeRouter = express.Router();

const likesControllers = new LikesControllers();

// + Add Like To Post Or Comment
likeRouter.get('/toggle/:likeableId', authMiddleware, (req, res, next) => {
    likesControllers.addLikeByTypeAndLikeableIdController(req, res, next);
});

// @ Get Like By Id
likeRouter.get('/:likeableId', (req, res, next) => {
    likesControllers.getLikeByIdController(req, res, next);
});

// - Delete Like

likeRouter.delete('/:likeId', authMiddleware, (req, res, next) => {
    likesControllers.deleteLikeByIdController(req, res, next);
})



export default likeRouter;