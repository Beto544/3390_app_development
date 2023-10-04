const { check, validationResult } = require("express-validator")

exports.validateUser = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Name is missing")
        .isLength({ min: 2, max: 25 })
        .withMessage("Name must be 2 to 25 characters long!"),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid Email!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage("Password is missing")
        .isLength({ min: 8, max: 25 })
        .withMessage("Password must be 8 to 25 characters long!"),
]

exports.validate = (req,res,next) => {
    const error = validationResult(req).array()
    if(!error.length) return next()

    res.status(400).json({sucess: false, error: error[0].msg})
}