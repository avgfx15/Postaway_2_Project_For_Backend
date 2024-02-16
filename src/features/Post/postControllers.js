import PostRepository from "./postRepository.js";




export default class PostControllers {

    constructor() {
        this.postRepo = new PostRepository();
    }

    // + Create a new Post

    createNewPostController = async (req, res, next) => {

        const user = req.user;
        try {
            const { title, location, description, category, keywords, } = req.body;
            const newPost = {
                title, location, description, category,
                keywords: keywords.split(','),
                images: req.files.images.map((image) => image.filename),
                documents: req.files.documents.map((document) => document.filename),
                userId: user.userId
            }
            const savedPost = await this.postRepo.createNewPostRepo(user, newPost);
            return res.status(201).json({ success: true, message: 'Post Saved Successfully', Post: savedPost })
        } catch (error) {
            next(error)
        }
    }

    // @ GET All Post

    getAllPostController = async (req, res, next) => {
        try {
            const allPosts = await this.postRepo.getAllPostsRepo();
            return res.status(201).json({ success: true, Posts: allPosts })
        } catch (error) {
            next(error)
        }
    }

    // @ GET Post By Specific User

    getPostByUserController = async (req, res, next) => {
        const userId = req.user.userId;
        console.log(userId);

        try {
            const getAllPost = await this.postRepo.getAllPostByUserRepo(userId);
            return res.status(201).json({ success: true, Posts: getAllPost })
        } catch (error) {
            next(error)
        }
    }
}