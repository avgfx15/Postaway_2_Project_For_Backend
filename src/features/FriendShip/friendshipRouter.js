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

// @ Get Received Friend Request For Logged User

friendRouter.get('/receivedrequest', authMiddleware, (req, res, next) => {
    friendsControllers.receivedFriendRequestController(req, res, next)
})

// @ Get All Pending Friend Request 

friendRouter.get('/allpendingrequest', (req, res, next) => {
    friendsControllers.getAllPendingRequestController(req, res, next)
})

// @ Get Accept Or Reject Friend Request 

friendRouter.get('/responseonrequest/:friendId', authMiddleware, (req, res, next) => {
    friendsControllers.giveResponseToRequsetController(req, res, next)
})



export default friendRouter;