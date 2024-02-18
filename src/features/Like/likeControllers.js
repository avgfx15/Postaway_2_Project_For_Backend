import LikesRepository from "./likeRepository.js"


export default class LikesControllers {

    constructor() {
        this.likeRepo = new LikesRepository();
    }

    // + Add Like to Post

    addLikeByTypeAndLikeableIdController = async (req, res, next) => {
        const userId = req.user.userId;
        const likeableId = req.params.likeableId;
        const type = req.query.type;
        try {
            if (type != 'post' && type != 'comments') {
                return res.status(400).json({ success: false, message: "Please input valid type" })
            }

            if (type === 'post') {
                await this.likeRepo.addLikeToPostRepo(userId, likeableId);
            } else {
                await this.likeRepo.addLikeToCommentRepo(userId, likeableId);
            }
            return res.status(200).json({ success: true, message: `Like was added successfully to ${type}` })
        } catch (error) {
            next(error)
        }
    }

    // @ GET Likes By Id

    getLikeByIdController = async (req, res, next) => {
        const likeableId = req.params.likeableId;
        try {
            const getLike = await this.likeRepo.getLikeByIdRepo(likeableId);
            return res.status(200).json({ success: true, Like: getLike })
        } catch (error) {
            next(error)
        }
    }

    // -  Delete Like By Id
    deleteLikeByIdController = async (req, res, next) => {
        const userId = req.user.userId;
        const likeId = req.params.likeId;
        try {
            await this.likeRepo.deleteLikeByIdRepo(userId, likeId);
            return res.status(200).json({ success: true, message: 'Like deleted successfully' })
        } catch (error) {
            next(error)
        }
    }

}