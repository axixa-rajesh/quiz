const {body}=require('express-validator');

export.createQuestionValidation=[
    body('topic_id').notEmpty().withMessage('Topic ID is required'),
    body('question_text').notEmpty().withMessage('Question text is required'),
    body('marks').isNumeric().withMessage('Marks must be a number')
];
