import db from "../models/index.js";
import { validateOptionCount } from "../validators/quizFormatvalidator.js";
import {getAllFormatsService,
      createFormatService,
      seedQuizFormatsService} from "../services/quizFormatService.js";
import {createQuizService,submitQuizService} from "../services/quizservice.js";

const { QuizFormat, Subject, Topic, Question, Option, Quiz } = db;

export const submitQuizController = async (req, res) => {
  try {
    // 1. Postman se aa rahe data ko console par dekhein
    console.log("--> Incoming Body:", req.body);

    const { user_id, quiz_id } = req.body;
    // Dono keys handle kar rahe hain: user_answers YA answers
    const user_answers = req.body.user_answers || req.body.answers;

    // 2. Agar koi field missing hai toh clearly pata chal jayega
    if (!user_id || !quiz_id || !user_answers) {
      console.log("Validation Failed! Values:", { user_id, quiz_id, user_answers });
      return res.status(400).json({
        success: false,
        error: "user_id, quiz_id, and user_answers (or answers) are required"
      });
    }

    const result = await submitQuizService({
      user_id,
      quiz_id,
      user_answers
    });

    return res.status(200).json({
      success: true,
      message: "Quiz submitted and evaluated successfully",
      data: result
    });
  } catch (error) {
    console.error("Submit Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const getQuizReportController=async(req,res)=>{
    try{
      const {quiz_id}=req.params;
      const reportData={
        quiz_id:Number(quiz_id),
        overview:{
            total_questions:10,
            total_marks:20,
            total_attempts:120
        },
        performance_metrics:{
          average_score:34.5,
          highest_score:50,
          lowest_score:12,
          pass_percentage:"83%"
        },
        generated_at:new Date().toISOString()
      };

      return res.status(200).json({
        success:true,
        data:reportData
      });
    }catch(error){
      return res.status(500).json({
        success:false,
        error:error.message
      });
    }
};

export const createQuizController=async(req,res)=>{
    console.log("--> Request received in Controller:", req.body);
  try{
    const quiz=await createQuizService(req.body);
    res.status(201).json({
      success:true,
      message:"Quiz created successfully",
      data:quiz
    });
  }catch(error){
    res.status(400).json({
      success:false,
      error:error.message
    })
  }
};

export const seedFormats=async(req,res)=>{
  try{
    const result=await seedQuizFormatsService();
    res.status(201).json(result);
  }catch(err){
    res.status(500).json({error:err.message});
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, description, topic_id } = req.body;
    if (!title || !topic_id) {
      return res.status(400).json({ error: "title and topic_id are required" });
    }
    const quiz = await Quiz.create({ title, description, topic_id });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const publishQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    await Quiz.update({ is_published: true }, { where: { id } });
    res.json({ message: "Quiz published successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuizFormats = async (req, res) => {
  try {
    const formats = await QuizFormat.findAll();
    res.json(formats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createQuizFormat = async (req, res) => {
  try {
    const { option_count, options } = req.body;
    const valid = validateOptionCount(options, option_count);
    if (!valid) {
      return res.status(400).json({ message: "option count mismatch" });
    }

    const format = await QuizFormat.create(req.body);
    res.json(format);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuizFormat = async (req, res) => {
  try {
    await QuizFormat.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: "Quiz format updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    return res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Subject name is required" });
    }
    const subject = await Subject.create({ name });
    res.status(201).json(subject);
  } catch (err) {
    console.error("Error in createSubject:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    await Subject.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Subject updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTopic = async (req, res) => {
  try {
    const { name, subject_id } = req.body;

    if (!name || !subject_id) {
      return res.status(400).json({ error: "Both 'name' and 'subject_id' are required" });
    }

    const topic = await Topic.create({ name, subject_id });
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTopic = async (req, res) => {
  try {
    await Topic.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Topic updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: [{ model: Option, as: "options" }]
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { question_text, topic_id, options } = req.body;
    if (!question_text || !topic_id) {
      return res.status(400).json({ error: "question_text and topic_id are required" });
    }
    if (!options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: "At least 2 options are required" });
    }
    const hasCorrect = options.some((opt) => opt.is_correct === true);
    if (!hasCorrect) {
      return res.status(400).json({ error: "At least one option must be marked as correct (is_correct: true)" });
    }

    const question = await Question.create({ question_text, topic_id });

    const optionData = options.map((opt) => ({
      ...opt,
      question_id: question.id
    }));
    await Option.bulkCreate(optionData);

    res.status(201).json({ message: "Question created with options", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question_text, topic_id, options } = req.body;

    await Question.update({ question_text, topic_id }, { where: { id } });

    if (options && Array.isArray(options) && options.length >= 2) {
      await Option.destroy({ where: { question_id: id } });
      const optionData = options.map((opt) => ({
        ...opt,
        question_id: id
      }));
      await Option.bulkCreate(optionData);
    }

    res.json({ message: "Question updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};