const { check, validationResult } = require('express-validator');
exports.validateSignupRequest = [
    check('firstName').notEmpty().withMessage('firstName is Required!'),
    check('lastName').notEmpty().withMessage('lastName is Required!'),
    check('email').isEmail().withMessage('Please Enter Valid Email!'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long!'),
];

exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Please Enter Valid Email!'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 character long!'),
];


exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}