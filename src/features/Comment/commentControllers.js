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
}