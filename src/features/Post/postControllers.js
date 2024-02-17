import { MulterError } from "multer";
import { customErrorHandler } from "../../errorHandler/errorHandler.js";
import PostRepository from "./postRepository.js";
import PostModel from "./postSchema.js";




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

        try {
            const getAllPost = await this.postRepo.getAllPostByUserRepo(userId);
            return res.status(201).json({ success: true, Posts: getAllPost })
        } catch (error) {
            next(error)
        }
    }

    // @ GET Post By Id

    getPostByPostIdController = async (req, res, next) => {
        const id = req.params.postId;

        try {
            const getPostByPostId = await this.postRepo.getPostByPostIdRepo(id);
            return res.status(201).json({ success: true, Post: getPostByPostId })
        } catch (error) {
            next(error)
        }
    }

    // * UPDATE Post By Id By UserId

    updatePostByUserByPostIdController = async (req, res, next) => {
        const userId = req.user.userId;
        const postId = req.params.postId;
        console.log(userId, postId);
        try {
            const checkPostByUser = await PostModel.findOne({ userId: userId, _id: postId });
            console.log(checkPostByUser.images);
            if (!checkPostByUser) {
                return res.status(404).json({ success: false, message: 'You are  not authorized to update' })
            } else {
                const { title, location, description, category, keywords, } = req.body;
                const update = {
                    title: title ? title : checkPostByUser.title,
                    location: location ? location : checkPostByUser.location,
                    description: description ? description : checkPostByUser.description,
                    category: category ? category : checkPostByUser.category,
                    keywords: keywords ? keywords.split(',') : checkPostByUser.keywords,
                }

                if (!req.files.images) {
                    const checkFileName = req.files.images.
                        update.images = checkPostByUser.images;
                } else {
                    const images = req.files.images.map((image) => image.filename);
                    update.images = images;
                }
                if (!req.files.documents) {
                    update.documents = checkPostByUser.documents;
                } else {
                    const documents = req.files.documents.map((document) => document.filename);
                    update.documents = documents;
                }
                const updatedPost = await this.postRepo.updatePostByUserByPostIdRepo(userId, postId, update);
                return res.status(201).json({ success: true, message: "Post updated By User Successfully", Post: updatedPost })
            }
        } catch (error) {
            next(error)
        }
    }

    // - Delete post by authorized user By post Id

    deletePostByAuthorizedUserByPostIdController = async (req, res, next) => {
        const userId = req.user.userId;
        const postId = req.params.postId;
        try {
            await this.postRepo.deletePostByAuthorizedUserByPostIdRepo(userId, postId);
            return res.status(201).json({ success: true, message: "Post deleted Successfully" })
        } catch (error) {
            next(error)
        }
    }
}