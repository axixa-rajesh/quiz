export const validateQuestionOptions = (
    options,
    type = "MCQ"
) => {

    if (!Array.isArray(options) || options.length < 2) {
        return {
            isValid: false,
            message: "Minimum 2 options are required."
        };
    }

    const emptyOption = options.some(
        option =>
            !option.text ||
            option.text.trim() === ""
    );

    if (emptyOption) {
        return {
            isValid: false,
            message: "Option text cannot be empty."
        };
    }

    const correctOptions = options.filter(
        option =>
            option.isCorrect === true ||
            option.is_correct === true
    );

    if (correctOptions.length === 0) {
        return {
            isValid: false,
            message: "At least one option must be correct."
        };
    }

    if (type === "MCQ" && correctOptions.length !== 1) {
        return {
            isValid: false,
            message: "MCQ must have exactly one correct option."
        };
    }

    return {
        isValid: true
    };
};

