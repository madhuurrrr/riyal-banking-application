const {body} = require("express-validator")

class AuthValidation{

    static loginUser=[
        body("email").notEmpty().withMessage("Email is Required").toLowerCase(),
        body("password").notEmpty().withMessage("Password is Required")
    ]

    static registerUser=[
        body("name").notEmpty().withMessage("Name is Required"),
        body("email").notEmpty().withMessage("Email is Required").toLowerCase(),
        body("password").notEmpty().withMessage("Password is Required"),
        body("ac_type").notEmpty().withMessage("Account type is Required").isIn(['saving',
        'current']).withMessage("Account should be a valid saving, or current account"),
    ]
}

module.exports = AuthValidation