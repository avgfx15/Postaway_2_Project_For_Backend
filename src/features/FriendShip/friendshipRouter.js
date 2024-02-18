import express from 'express';
import authMiddleware from '../../middlewares/authMiddleware.js';
import FriendsControllers from './friendshipControllers.js';

const friendRouter = express.Router();

const friendsControllers = new FriendsControllers();

// @ Get Friend Request

friendRouter.get('/friendrequest/:userId', authMiddleware, (req, res, next) => {
    friendsControllers.getFriendRequestController(req, res, next)
})

// @ Get Pending Friend Request For Logged User

friendRouter.get('/pendingrequest', authMiddleware, (req, res, next) => {
    friendsControllers.getPendingRequestForLoggedUserController(req, res, next)
})

// @ Get Pending Friend Request Received

friendRouter.get('/pendingrequest', authMiddleware, (req, res, next) => {
    friendsControllers.getPendingRequestForLoggedUserController(req, res, next)
})



export default friendRouter;