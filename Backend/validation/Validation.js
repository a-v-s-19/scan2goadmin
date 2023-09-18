const { check } = require('express-validator');

exports.AdminRegistrationValidation = [
    check('email', 'Enter a Valid Email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('name', "Enter a valid Name ( Length > 3)").isLength({ min: 3 }),
    check('mobile', 'Mobile Number Contains 10 digits only').isLength({
        min: 10,
        max: 10
    }),
    check('password', 'Enter a strong password ( At Least 1 Number, 1 Uppercase, 1 Lowercase , 1 Special Character )').isStrongPassword({
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    })
];
exports.AdminLoginValidation = [
    check('email', 'Enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Enter a valid password').exists()
];
exports.ProductValidation = [
    check('pid', 'Enter a valid Product Id ( Length == 10)').isLength({
        min: 10,
        max: 10
    }).isAlphanumeric(),
    check('ptype', 'Enter Product Type').isLength({min:3}),
    check('pname', 'Enter a Valid Product Name').isLength({ min: 3 }),
    check('pprice', 'Enter Product Price').isNumeric(),
    check('poffer', 'Enter Product Offer ( Optional )').isNumeric()
]