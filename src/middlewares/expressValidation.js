import { body, validationResult } from 'express-validator';
import { customErrorHandler } from '../errorHandler/errorHandler.js';
import UserModel from '../features/User/userSchema.js';
import { logger } from './loggerMiddleware.js';

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
    const expectedCategories = ['Wonders', 'Festivals', 'Amazing India', 'Interesting Facts', 'Education', 'IT', 'Technology', 'Gadgets', 'Others',];

    const rules = [
        body('title').notEmpty().withMessage('Title is required.'),
        body('location').notEmpty().withMessage('Location is required.'),
        body('description').notEmpty().withMessage('Description is required.'),
        body('category').isIn(expectedCategories).withMessage('Please enter perfect Category.'),
        body('images').custom((value, { req }) => {
            const imageType = req.files.images.map((image) => image.mimetype === 'image/jpeg' || image.mimetype === 'image/png' || image.mimetype === 'image/jpg' || image.mimetype === 'image/gif' || image.mimetype === 'image/webp');

            if (imageType) {
                return true;
            } else {
                return false;
            }
        }).withMessage('Please upload an image Jpeg, PNG'),
        body('documents').custom((value, { req }) => {
            const documentsType = req.files.documents.map(doc => doc.mimetype === 'application/msword' || doc.mimetype === 'application/pdf');
            if (documentsType) {
                return true;
            } else {
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
