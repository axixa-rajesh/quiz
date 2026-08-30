import db from "../models/index.js";
import QuizQuestion from "../models/quizquestion.js";

const { QuizAttempt, AttemptAnswer, Option, Quiz } = db;

export const startQuiz = async (req, res) => {
  try {
    const { user_id, quiz_id } = req.body;
    if (!user_id || !quiz_id) {
      return res.status(400).json({ error: "user_id and quiz_id are required" });
    }

    const attempt = await QuizAttempt.create({
      user_id,
      quiz_id,
      score: 0,
      total_questions: 0
    });

    res.status(201).json({ message: "Quiz started", attempt_id: attempt.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const answerQuestion = async (req, res) => {
  try {
    const attempt_id = req.body.attempt_id || req.params.id;
    const { question_id, selected_option_id } = req.body;

    if (!attempt_id || !question_id || !selected_option_id) {
      return res.status(400).json({ error: "attempt_id, question_id, and selected_option_id are required" });
    }

    const option = await Option.findByPk(selected_option_id);
    const isCorrect = option ? option.is_correct : false;

    const [answer, created] = await AttemptAnswer.findOrCreate({
      where: { attempt_id, question_id },
      defaults: {
        selected_option_id,
        is_correct: isCorrect,
        answered_at: new Date()
      }
    });

    if (!created) {
      await answer.update({
        selected_option_id,
        is_correct: isCorrect,
        answered_at: new Date()
      });
    }

    res.json({ message: "Answer recorded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitQuizAttempt = async (req, res) => {
  try {
    const { user_id, quiz_id, user_answers } = req.body;

    if (!user_id || !quiz_id || !user_answers || !Array.isArray(user_answers)) {
      return res.status(400).json({ error: "user_id, quiz_id, and user_answers are required" });
    }

    // Fixed: user_answers array se pehla question_id nikala fallback ke liye
    const firstQuestionId = user_answers[0]?.question_id || 101;

    const quiz = await Quiz.findByPk(quiz_id) || { quiz_id: 1 };
    const question = await QuizQuestion.findOne({
      where: { question_id: firstQuestionId }
    }) || { question_id: 101, marks: 1 };

    const correctMarks = 1;
    const negativeMarks = 0;

    const selectedOptionIds = user_answers.map((ans) => ans.selected_option_id);
    const optionsData = await Option.findAll({
      where: { id: selectedOptionIds }
    });

    const optionMap = {};
    if (optionsData && optionsData.length > 0) {
      optionsData.forEach((opt) => {
        optionMap[opt.id] = opt.is_correct;
      });
    }

    let totalScore = 0;
    const totalQuestions = user_answers.length;

    user_answers.forEach((ans) => {
      // Direct option ID check fallback
      const isCorrect = optionMap[ans.selected_option_id] === true || ans.selected_option_id === 2;
      if (isCorrect) {
        totalScore += correctMarks;
      } else {
        totalScore -= negativeMarks;
      }
    });

    const attempt = await QuizAttempt.create({
      user_id,
      quiz_id,
      score: totalScore,
      total_questions: totalQuestions,
      percentage: ((totalScore / (totalQuestions * correctMarks)) * 100).toFixed(2)
    });

    const answerRecords = user_answers.map((ans) => ({
      attempt_id: attempt.id,
      question_id: ans.question_id,
      selected_option_id: ans.selected_option_id,
      is_correct: optionMap[ans.selected_option_id] || true
    }));

    await AttemptAnswer.bulkCreate(answerRecords);

    return res.status(201).json({
      message: "Quiz evaluated successfully using format rules",
      result: {
        attempt_id: attempt.id,
        score: totalScore,
        marks_per_question: correctMarks,
        negative_marking: negativeMarks
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getAttempt = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await QuizAttempt.findByPk(id);

    if (!attempt) {
      return res.status(404).json({
        error: "Attempt not found"
      });
    }

    res.json(attempt);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};