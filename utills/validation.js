const { body,param,validationResult } = require('express-validator');

const validateRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

exports.validateCreateAsset = [
    body('make').notEmpty().withMessage('Make is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('typeId').notEmpty().withMessage('Type ID is required').isInt().withMessage('Type ID must be an integer'),
    validateRequest
];

exports.validateIssueAsset = [
    body('assetSerialNumber').notEmpty().withMessage('Asset serial number is required'),
    body('employeeId').notEmpty().withMessage('Employee ID is required').isInt().withMessage('Employee ID must be an integer'),
    validateRequest
];

exports.returnAssetValidation = [
    body('assetSerialNumber').notEmpty().withMessage('Asset serial number is required'),
    body('returnReason').notEmpty().withMessage('Return reason is required'),
    validateRequest
];

exports.scrapAssetValidation = [
    body('assetSerialNumber').notEmpty().withMessage('Asset serial number is required'),
    body('returnReason').notEmpty().withMessage('Return reason is required'),
    body('employeeId').notEmpty().withMessage('Employee ID is required').isInt().withMessage('Employee ID must be an integer'),
    validateRequest
];

exports.getAssetHistoryValidation = [
    param('assetSerialNumber').notEmpty().withMessage('Asset serial number is required'),
    validateRequest
];

exports.createEmployeeValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value'),
    validateRequest
];

exports.updateEmployeeValidation = [
    param('id').notEmpty().withMessage('Employee ID is required').isInt().withMessage('Employee ID must be an integer'),
    body('name').notEmpty().withMessage('Name is required'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value'),
    validateRequest
];
