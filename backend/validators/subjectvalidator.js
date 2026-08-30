const {body}=require('express-validator');

exports.createSubjectValidation=[
    body('subject_code').notEmpty().withMessage('Subject code is required');
    body('name').notEmpty().withMessage('Subject name is required');
];