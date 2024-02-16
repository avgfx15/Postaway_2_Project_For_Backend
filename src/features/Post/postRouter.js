import express from 'express';
import upload from "../../middlewares/fileUploadMiddleware.js";
import authModdleware from '../../middlewares/authModdleware.js';
import PostControllers from './postControllers.js';
import { postValidation, } from '../../middlewares/expressValidation.js';

const postRouter = express.Router();

const postControllers = new PostControllers();

// + Create New Post

// const multipleUploads = upload.fields([{ name: 'media', maxCount: 5 }])
postRouter.post('/', upload, postValidation, authModdleware, (req, res, next) => {
    postControllers.createNewPostController(req, res, next);
})




export default postRouter;
