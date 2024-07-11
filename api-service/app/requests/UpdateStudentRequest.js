const { body, validationResult } = require('express-validator');

const validateUpdate = [
    body('full_name').notEmpty().withMessage('Fullname is required.'),
    body('status').notEmpty().withMessage('Status is required.'),
    (request, response, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.formatter.badRequest(errors.array());
        }
        next();
    }
]
module.exports = {
    validateUpdate
};