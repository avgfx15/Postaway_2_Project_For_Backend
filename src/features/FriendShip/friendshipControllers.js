import FriendRepository from "./friendshipRepository.js";


export default class FriendsControllers {
    constructor() {
        this.friendRepo = new FriendRepository();
    }
    // + Add Friend
    getFriendRequestController = async (req, res, next) => {
        const requesterUserId = req.user.userId;
        const recipientUserId = req.params.userId;
        try {
            const getRequest = await this.friendRepo.getFriendRequestRepo(requesterUserId, recipientUserId);
            return res.status(200).json({ success: true, message: 'Friend request sent successfully' })
        } catch (error) {
            next(error)
        }
    }

    // @ Get Pending Request
    getPendingRequestForLoggedUserController = async (req, res, next) => {
        const userId = req.user.userId;
        try {
            const getPendingRequest = await this.friendRepo.getPendingRequestForLoggedUserRepo(userId);
            return res.status(200).json({ success: true, message: 'Still Your request is Pending', FriendRequest: getPendingRequest })
        } catch (error) {
            next(error)
        }
    }
}