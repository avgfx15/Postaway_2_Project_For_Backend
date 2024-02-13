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