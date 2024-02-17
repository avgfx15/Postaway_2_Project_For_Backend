import CommentsRepository from "./commentRepository.js";

export default class CommentsControllers {

    constructor() {
        this.commentRepo = new CommentsRepository();
    }

    // + Create New Comment By Post Id

    createNewCommentByPostIdController = async (req, res, next) => {
        const userId = req.user.userId;
        const postId = req.params.postId;
        try {
            const { content } = req.body;
            const addedComment = await this.commentRepo.createNewCommentRepo(userId, postId, content)
            return res.status(201).json({ success: true, message: "Comment created successfully", Comment: addedComment })
        } catch (error) {
            next(error)
        }
    }

    // @ GET Comment by postId
    getCommentByPostIdController = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            const getCommentByPostId = await this.commentRepo.getCommentByPostIdRepo(postId);
            return res.status(200).json({ success: true, Post: getCommentByPostId })
        } catch (error) {
            next(error)
        }
    }

    // * Update Comment By Id

    updateCommentByCommentIdController = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const commentId = req.params.commentId;
            const { content } = req.body;
            const updateComment = await this.commentRepo.updateCommentByCommentIIdRepo(userId, commentId, content);
            return res.status(201).json({ success: true, message: "Comment updated successfully", Comment: updateComment })
        } catch (error) {
            next(error)
        }
    }

    // - Delete Comment By commentId

    deleteCommentByCommentIdController = async (req, res, next) => {
        const userId = req.user.userId;
        const commentId = req.params.commentId
        try {
            const deletedComment = await this.commentRepo.deleteCommentByCommentIdRepo(userId, commentId);
            return res.status(201).json({ success: true, message: "Comment deleted successfully" })
        } catch (error) {
            next(error)
        }
    }
}