import { customErrorHandler } from "../../errorHandler/errorHandler.js";
import UserModel from "../User/userSchema.js"
import FriendModel from "./friendshipSchema.js";


export default class FriendRepository {

    // + Get Friend Request
    getFriendRequestRepo = async (requesterId, recipientId) => {
        const checkAlreadyRequested = await FriendModel.findOne({ requester: requesterId, recipient: recipientId });
        const checkAlreadyReceived = await FriendModel.findOne({ requester: recipientId, recipient: requesterId });
        if (checkAlreadyRequested || checkAlreadyReceived) {
            throw new customErrorHandler(401, 'Already sent a request')
        }
        const recipientUser = await UserModel.findById({ _id: recipientId });
        const requestedUser = await UserModel.findById({ _id: requesterId });
        if (!recipientUser) {
            throw new customErrorHandler(400, 'User not found');
        } else {

            const newFriendRequest = new FriendModel({
                requester: requesterId,
                recipient: recipientId,
                status: false
            });
            const savedRequest = await newFriendRequest.save();
            await recipientUser.friends.push(savedRequest._id);
            await recipientUser.save();
            await requestedUser.friends.push(savedRequest._id);
            await requestedUser.save();
        }
    }

    // @ GET Pending Request
    getPendingRequestForLoggedUserRepo = async (userId) => {
        const getPendingRequest = await FriendModel.find({ requester: userId, status: false });
        if (!getPendingRequest) {
            throw new customErrorHandler(400, 'No Pending friend request found');
        } else {
            return getPendingRequest;
        }
    }

    // @ Get Received Friend Requset 
    receivedFriendRequestRepo = async (userId) => {
        const receivedRequest = await FriendModel.find({ recipient: userId });
        return receivedRequest;
    }

    // @ Get All Pending Requset
    getAllPendingRequestRepo = async () => {
        const getAllPendingRequest = await FriendModel.find({ status: false });
        return getAllPendingRequest;
    }

    // @ Give response to pending
    giveResponseToRequsetRepo = async (userId, friendId) => {
        const findRequest = await FriendModel.findOne({ _id: friendId, recipient: userId, });

        if (!findRequest) {
            throw new customErrorHandler(400, 'No Pending friend request found found')
        } else {
            if (findRequest.status === false) {
                findRequest.status = true;
                await findRequest.save();
                return { success: true, message: 'Friens request Accepted' };
            } else {
                findRequest.status = false;
                await findRequest.save();
                return { success: true, message: 'Friend request Rejected' };
            }
        }
    }
}