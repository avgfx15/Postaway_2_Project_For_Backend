import { body, validationResult } from 'express-validator';
import { customErrorHandler } from '../errorHandler/errorHandler.js';
import UserModel from '../features/User/userSchema.js';

export const signUpFormValidator = async (req, res, next) => {

    const rules = [
        body('name').notEmpty().withMessage('Name is required.'),
        body('email').isEmail().custom(async enteredEmail => {
            const existingUser = await UserModel.findOne({ email: enteredEmail });
            if (existingUser) {
                // Will use the below as the error message
                throw new Error('A user already exists with this e-mail address');
            }
        }),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('gender').custom(async enteredGender => {
            if (enteredGender != "Male" && enteredGender != 'Female' && enteredGender != 'Transgender') {
                throw new Error('Gender must be either Male, Female or Transgender');
            }
        })
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((err) => err.path + " - " + err.msg);
        return res.status(400).json(errors);
    }
    next();
}


// // POST Valiation
export const postValidation = async (req, res, next) => {
    console.log('Post Validation');
    const rules = [

        body('title').notEmpty().withMessage('Name is required.'),
        body('location').notEmpty().withMessage('Location is required.'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('category').notEmpty().withMessage('Category is required.'),
        body('keywords').notEmpty().withMessage('Keywords is required.'),
        body('images').custom((value, { req }) => {
            console.log(req.files.image[0].mimetype);
            console.log(value);
            const imageType = req.files.images.map((image) => image.mimetype === 'image/jpeg' || image.mimetype === 'image/png' || image.mimetype === 'image/JGP')
            console.log(imageType);
            if (req.files.images[0].mimetype === 'images/jpeg' || req.files.image[0].mimetype === 'images/png') {
                return true;
            }
            else {
                return false;
            }
        }).withMessage('Please upload an image Jpeg, PNG'),
        body('documents').custom((value, { req }) => {
            if (req.files.documents[0].mimetype === 'application/msword' || req.files.document[0].mimetype === 'application/pdf') {
                return true;
            }
            else {
                return false;
            }
        }).withMessage('Please upload pdf or doc format')
    ];


    await Promise.all(rules.map((rule) => rule.run(req)));

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((err) => err.path + " - " + err.msg);
        return res.status(400).json(errors);
    }
    next();
}